import { notFound } from 'next/navigation'
import { getDailyByDate, getDailyIndex } from '../../../lib/content'
import { Markdown } from '../../../components/markdown'
import { Container, SectionTitle } from '../../../components/ui'
import { ArticleList } from '../../../components/article-list'
import { getDigest } from '../../../lib/digest'

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

  const digest = await getDigest(params.date)

  return (
    <Container>
      <div className="py-10">
        <div className="grid gap-10 md:grid-cols-12">
          <article className="md:col-span-8">
            <SectionTitle title={doc.title} subtitle={params.date} />
            <div className="mt-6 rounded-xl border border-border bg-white/60 p-6">
              <Markdown content={doc.body} />
            </div>
          </article>

          <aside className="md:col-span-4">
            <div className="rounded-xl border border-border bg-white/60 p-5">
              <div className="font-serif text-lg font-semibold">Top Stories</div>
              <p className="mt-1 text-sm text-muted">Bu günün otomatik seçkisi.</p>
              <div className="mt-4">
                <ArticleList items={digest.top.slice(0, 8)} />
              </div>
            </div>

            <div className="mt-6 text-sm">
              <a className="text-ink/80 hover:text-ink" href="/ainews/archive">
                ← Arşive dön
              </a>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  )
}
