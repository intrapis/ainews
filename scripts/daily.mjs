import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SOURCES_FILE = path.join(ROOT, 'content', 'sources.json')
const DAILY_DIR = path.join(ROOT, 'content', 'daily')
const PUBLIC_DIR = path.join(ROOT, 'public')

function stripHtml(s = '') {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function decodeEntities(s = '') {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function firstMatch(text, re) {
  const m = text.match(re)
  return m ? m[1] : undefined
}

function parseRss(xml) {
  // Extremely simple best-effort parser: grabs <item> blocks.
  const items = []
  const blocks = xml.split(/<item[\s>]/i).slice(1)
  for (const b of blocks) {
    const chunk = '<item ' + b
    const title = decodeEntities(stripHtml(firstMatch(chunk, /<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) || firstMatch(chunk, /<title>([\s\S]*?)<\/title>/i) || ''))
    const link = (firstMatch(chunk, /<link>([\s\S]*?)<\/link>/i) || '').trim()
    const pubDateRaw = (firstMatch(chunk, /<pubDate>([\s\S]*?)<\/pubDate>/i) || '').trim()
    const descRaw = firstMatch(chunk, /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) || firstMatch(chunk, /<description>([\s\S]*?)<\/description>/i) || ''
    const description = decodeEntities(stripHtml(descRaw)).slice(0, 220)

    const date = pubDateRaw ? new Date(pubDateRaw) : null
    items.push({ title, link, pubDateRaw, date: date && !isNaN(date) ? date : null, description })
  }
  return items
}

function todayTR() {
  // Use Europe/Istanbul without external libs.
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  return fmt.format(new Date()) // YYYY-MM-DD
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'ainews-bot/0.1 (+https://github.com/intrapis/ainews)',
      'accept': 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.7'
    }
  })
  const text = await res.text()
  return { ok: res.ok, status: res.status, text }
}

function buildMarkdown(date, grouped) {
  const lines = []
  lines.push(`# AI Haber Özeti — ${date}`)
  lines.push('')
  lines.push('> Not: Bu özet ücretsiz RSS kaynaklarından otomatik derlenir. Her madde ilgili kaynağa link verir.')
  lines.push('')

  for (const g of grouped) {
    lines.push(`## ${g.source}`)
    lines.push('')
    for (const it of g.items) {
      const blurb = it.description ? ` — ${it.description}` : ''
      lines.push(`- [${it.title}](${it.link})${blurb}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

function buildSiteRss(baseUrl, latestEntries) {
  const items = latestEntries
    .map((e) => {
      const url = `${baseUrl}/d/${e.date}/`
      return `\n<item>\n<title>${escapeXml(e.title)}</title>\n<link>${escapeXml(url)}</link>\n<guid>${escapeXml(url)}</guid>\n<pubDate>${new Date(e.date + 'T06:00:00Z').toUTCString()}</pubDate>\n<description>${escapeXml(e.excerpt)}</description>\n</item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>AI Haber Özeti (TR)</title>
<link>${baseUrl}/</link>
<description>Her gün RSS kaynaklarından derlenen AI haber özeti.</description>
${items}
</channel>
</rss>`
}

function escapeXml(s = '') {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function main() {
  await fs.mkdir(DAILY_DIR, { recursive: true })
  await fs.mkdir(PUBLIC_DIR, { recursive: true })

  const sources = JSON.parse(await fs.readFile(SOURCES_FILE, 'utf-8'))

  const all = []
  for (const s of sources) {
    const { ok, status, text } = await fetchText(s.url)
    if (!ok) {
      console.error('fetch failed', s.url, status)
      continue
    }
    const items = parseRss(text)
      .filter((it) => it.title && it.link)
      .slice(0, 20)
      .map((it) => ({ ...it, source: s.name }))
    all.push(...items)
  }

  // Sort by date desc; if missing date, keep later.
  all.sort((a, b) => {
    const ad = a.date ? a.date.getTime() : 0
    const bd = b.date ? b.date.getTime() : 0
    return bd - ad
  })

  // Keep overall top 60 items.
  const top = all.slice(0, 60)

  // Group by source.
  const bySource = new Map()
  for (const it of top) {
    if (!bySource.has(it.source)) bySource.set(it.source, [])
    bySource.get(it.source).push(it)
  }

  const grouped = [...bySource.entries()].map(([source, items]) => ({
    source,
    items: items.slice(0, 10)
  }))

  const date = todayTR()
  const md = buildMarkdown(date, grouped)
  await fs.writeFile(path.join(DAILY_DIR, `${date}.md`), md, 'utf-8')

  // Build site-level RSS from latest 14 days
  const dailyFiles = (await fs.readdir(DAILY_DIR))
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .sort((a, b) => (a > b ? -1 : 1))
    .slice(0, 14)

  const entries = []
  for (const d of dailyFiles) {
    const raw = await fs.readFile(path.join(DAILY_DIR, `${d}.md`), 'utf-8')
    const title = (raw.match(/^#\s+(.+)$/m) || [])[1] || d
    const excerptLine = raw
      .split('\n')
      .filter((l) => l && !l.startsWith('#') && !l.startsWith('>'))[0]
    const excerpt = (excerptLine || '').replace(/^[-*]\s+/, '').slice(0, 180)
    entries.push({ date: d, title, excerpt })
  }

  const baseUrl = 'https://intrapis.github.io/ainews'
  const rss = buildSiteRss(baseUrl, entries)
  await fs.writeFile(path.join(PUBLIC_DIR, 'rss.xml'), rss, 'utf-8')

  console.log('OK daily generated', date, 'items', top.length)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
