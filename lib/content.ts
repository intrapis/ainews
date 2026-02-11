import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const DAILY_DIR = path.join(ROOT, 'content', 'daily')

export type DailyIndexEntry = {
  date: string
  title: string
  excerpt: string
}

export async function getDailyIndex(): Promise<DailyIndexEntry[]> {
  try {
    const files = await fs.readdir(DAILY_DIR)
    const dates = files
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))
      .sort((a, b) => (a > b ? -1 : 1))

    const entries: DailyIndexEntry[] = []
    for (const d of dates) {
      const doc = await getDailyByDate(d)
      if (!doc) continue
      entries.push({
        date: d,
        title: doc.title,
        excerpt: doc.excerpt
      })
    }
    return entries
  } catch {
    return []
  }
}

export async function getDailyByDate(date: string): Promise<
  | {
      title: string
      excerpt: string
      body: string
    }
  | undefined
> {
  const file = path.join(DAILY_DIR, `${date}.md`)
  try {
    const raw = await fs.readFile(file, 'utf-8')
    const lines = raw.split('\n')
    const titleLine = lines.find((l) => l.startsWith('# '))
    const title = titleLine ? titleLine.replace(/^# /, '').trim() : date

    // excerpt: first non-empty line after title
    let excerpt = ''
    let seenTitle = false
    for (const l of lines) {
      if (!seenTitle) {
        if (l.startsWith('# ')) seenTitle = true
        continue
      }
      const t = l.trim()
      if (!t) continue
      excerpt = t.replace(/^[-*]\s+/, '').slice(0, 180)
      break
    }

    return { title, excerpt, body: raw }
  } catch {
    return undefined
  }
}
