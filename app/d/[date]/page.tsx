import { notFound } from 'next/navigation'
import { getDailyByDate, getDailyIndex } from '../../../lib/content'
import { Markdown } from '../../../components/markdown'

export async function generateStaticParams() {
  const index = await getDailyIndex()
  return index.map((d) => ({ date: d.date }))
}

export default async function DailyPage({
  params
}: {
  params: { date: string }
}) {
  const doc = await getDailyByDate(params.date)
  if (!doc) return notFound()

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm text-muted">{params.date}</p>
        <h1 className="text-2xl font-semibold">{doc.title}</h1>
      </header>
      <div className="rounded-lg border border-white/10 bg-card p-6">
        <Markdown content={doc.body} />
      </div>

      <div className="text-sm text-muted">
        <a className="hover:underline" href="/ainews/archive">
          ← Arşive dön
        </a>
      </div>
    </article>
  )
}
