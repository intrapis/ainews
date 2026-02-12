import { ArticleList } from '../components/article-list'
import { BriefStrip } from '../components/brief'
import { BentoCard, HeroStory } from '../components/bento'
import { CategoryPills } from '../components/category-pills'
import { TopSlider } from '../components/top-slider'
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
      <div className="py-10 space-y-8">
        <BriefStrip items={digest.top} date={latest.date} />

        <div className="grid gap-6 md:grid-cols-12">
          <section className="md:col-span-8 space-y-6">
            <SectionTitle title="Top Stories" subtitle="Bento grid + hızlı tarama" />

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-12">
                <TopSlider items={digest.top} />
              </div>
              <div className="md:col-span-12">
                <div className="grid gap-4 md:grid-cols-12">
                  <div className="md:col-span-7">
                    <HeroStory item={digest.top[0]} />
                  </div>
                  <div className="md:col-span-5 grid gap-4">
                    {digest.top.slice(1, 3).map((it) => (
                      <BentoCard key={it.url} item={it} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:col-span-12 grid gap-4 md:grid-cols-3">
                {digest.top.slice(3, 6).map((it) => (
                  <BentoCard key={it.url} item={it} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="px-5 py-4">
                <div className="text-xs tracking-[0.16em] text-white/60">
                  {latest.date} · TOP 12
                </div>
              </div>
              <Divider />
              <div className="px-5">
                <ArticleList items={digest.top} />
              </div>
            </div>
          </section>

          <aside className="md:col-span-4 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="font-serif text-lg font-semibold text-white">
                Categories
              </div>
              <p className="mt-1 text-sm text-white/60">Tematik akışlar.</p>
              <div className="mt-4">
                <CategoryPills />
              </div>
            </div>

            <div>
              <SectionTitle title="Latest" subtitle="Daha fazla haber" />
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5">
                <ArticleList items={digest.latest} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  )
}
