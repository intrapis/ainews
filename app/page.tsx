import { ArticleList } from '../components/article-list'
import { Container, Divider, SectionTitle } from '../components/ui'
import { getDailyIndex } from '../lib/content'
import { getDigest } from '../lib/digest'

export default async function HomePage() {
  const index = await getDailyIndex()
  const latest = index[0]

  if (!latest) {
    return (
      <Container>
        <div className="py-10 text-muted">Henüz günlük özet yok.</div>
      </Container>
    )
  }

  const digest = await getDigest(latest.date)

  return (
    <Container>
      <div className="py-10">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Left: Top stories */}
          <section className="md:col-span-7">
            <SectionTitle
              title="Top Stories"
              subtitle="Bugünün en önemli başlıkları (otomatik seçki)"
            />
            <div className="mt-4 rounded-xl border border-border bg-white/60">
              <div className="px-5 py-4">
                <div className="text-xs tracking-[0.16em] text-muted">
                  {latest.date} · TOP 12
                </div>
              </div>
              <Divider />
              <div className="px-5">
                <ArticleList items={digest.top} />
              </div>
            </div>
          </section>

          {/* Right: Latest + meta */}
          <aside className="md:col-span-5">
            <div className="space-y-8">
              <div>
                <SectionTitle
                  title="Latest"
                  subtitle="Daha fazla haber (seçili kaynaklardan)"
                />
                <div className="mt-4 rounded-xl border border-border bg-white/60 px-5">
                  <ArticleList items={digest.latest} />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-white/60 p-5">
                <div className="font-serif text-lg font-semibold">Daily Brief</div>
                <p className="mt-1 text-sm text-muted">
                  Her sabah 09:00 TR güncellenir. İstersen RSS ile takip et.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <a className="text-ink/80 hover:text-ink" href={`/ainews/d/${latest.date}`}>
                    Bugünün sayfası →
                  </a>
                  <a className="text-ink/80 hover:text-ink" href="/ainews/archive">
                    Arşiv →
                  </a>
                  <a className="text-ink/80 hover:text-ink" href="/ainews/rss.xml">
                    RSS →
                  </a>
                </div>
              </div>

              <div className="text-xs text-muted">
                Not: Bu site otomatik derlenir; editoryal değildir.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  )
}
