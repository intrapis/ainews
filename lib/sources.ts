import fs from 'node:fs/promises'
import path from 'node:path'

export type Source = { name: string; url: string }

export async function getSources(): Promise<Source[]> {
  const file = path.join(process.cwd(), 'content', 'sources.json')
  const raw = await fs.readFile(file, 'utf-8')
  const j = JSON.parse(raw)
  return Array.isArray(j) ? (j as Source[]) : []
}
