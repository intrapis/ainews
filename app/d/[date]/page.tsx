import { notFound } from 'next/navigation'
import { getDailyByDate, getDailyIndex } from '../../../lib/content'
import { Markdown } from '../../../components/markdown'
import { Card, Container } from '../../../components/ui'

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
    <Container>
      <article className="py-10 space-y-6">
        <header className="space-y-2">
          <p className="text-sm text-muted">{params.date}</p>
          <h1 className="text-3xl font-semibold tracking-tight">{doc.title}</h1>
        </header>

        <Card className="p-6 md:p-8">
          <Markdown content={doc.body} />
        </Card>

        <div className="text-sm text-muted">
          <a className="hover:text-text" href="/ainews/archive">
            ← Arşive dön
          </a>
        </div>
      </article>
    </Container>
  )
}
