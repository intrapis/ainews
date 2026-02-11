import fs from 'node:fs/promises'
import path from 'node:path'

export type DigestItem = {
  title: string
  url: string
  source: string
  description?: string
  date?: string
  section?: 'Top' | 'Product' | 'Research' | 'Policy' | 'Other'
}

const DAILY_DIR = path.join(process.cwd(), 'content', 'daily')

function normTitle(s: string) {
  return s
    .toLowerCase()
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9ğüşöçıİâêîôû\s-]/gi, '')
    .trim()
}

function jaccard(a: string, b: string) {
  const A = new Set(a.split(' ').filter(Boolean))
  const B = new Set(b.split(' ').filter(Boolean))
  let inter = 0
  for (const x of A) if (B.has(x)) inter++
  const union = A.size + B.size - inter
  return union === 0 ? 0 : inter / union
}

function classify(title: string): DigestItem['section'] {
  const t = title.toLowerCase()
  if (/(launch|release|ship|product|app|feature|pricing|api|beta)/.test(t)) return 'Product'
  if (/(paper|arxiv|benchmark|dataset|model|weights|training|eval)/.test(t)) return 'Research'
  if (/(eu|law|policy|regulat|copyright|ban|court|antitrust|security)/.test(t)) return 'Policy'
  return 'Other'
}

function score(it: DigestItem) {
  const t = it.title.toLowerCase()
  let s = 0
  // keyword boosts
  if (/(openai|anthropic|google|deepmind|meta|microsoft|nvidia)/.test(t)) s += 2
  if (/(agent|agents|reasoning|multimodal|llm|model|chip|gpu)/.test(t)) s += 2
  if (/(breakthrough|security|ban|lawsuit|funding|acquires|launch)/.test(t)) s += 1
  // source weights (light)
  if (/techcrunch/i.test(it.source)) s += 1
  if (/mit technology review/i.test(it.source)) s += 1
  return s
}

export async function getDigest(date: string): Promise<{
  top: DigestItem[]
  latest: DigestItem[]
}> {
  const file = path.join(DAILY_DIR, `${date}.md`)
  const raw = await fs.readFile(file, 'utf-8')

  // parse markdown lines like: - [title](url) — desc
  const items: DigestItem[] = []
  let currentSource = 'Source'

  for (const line of raw.split('\n')) {
    const h = line.match(/^##\s+(.+)$/)
    if (h) {
      currentSource = h[1].trim()
      continue
    }

    const m = line.match(/^-\s+\[(.+?)\]\((https?:\/\/[^)]+)\)(?:\s+—\s+(.*))?$/)
    if (m) {
      const title = m[1].trim()
      const url = m[2].trim()
      const description = (m[3] || '').trim() || undefined
      items.push({
        title,
        url,
        source: currentSource,
        description,
        date,
        section: classify(title)
      })
    }
  }

  // dedupe by url
  const seenUrl = new Set<string>()
  const byUrl: DigestItem[] = []
  for (const it of items) {
    if (seenUrl.has(it.url)) continue
    seenUrl.add(it.url)
    byUrl.push(it)
  }

  // fuzzy dedupe by title similarity
  const result: DigestItem[] = []
  for (const it of byUrl) {
    const nt = normTitle(it.title)
    let dup = false
    for (const ex of result) {
      const sim = jaccard(nt, normTitle(ex.title))
      if (sim >= 0.82) {
        dup = true
        break
      }
    }
    if (!dup) result.push(it)
  }

  // sort: prefer higher score first, then stable
  const ranked = [...result].sort((a, b) => score(b) - score(a))
  const top = ranked.slice(0, 12).map((x) => ({ ...x, section: 'Top' as const }))

  // latest: keep original order roughly by source blocks; here just take remaining
  const rest = result.filter((x) => !top.some((t) => t.url === x.url))
  const latest = rest.slice(0, 30)

  return { top, latest }
}
