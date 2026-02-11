import { DailyCard } from '../components/daily-card'
import { Hero } from '../components/hero'
import { Container } from '../components/ui'
import { getDailyIndex } from '../lib/content'

export default async function HomePage() {
  const index = await getDailyIndex()
  const latest = index[0]

  return (
    <div>
      <Hero latestDate={latest?.date} totalDays={index.length} />

      <Container>
        <div className="space-y-10">
          {!latest ? (
            <div className="rounded-2xl border border-border bg-white/5 p-6 text-muted">
              Henüz günlük özet yok. İlk run bekleniyor.
            </div>
          ) : (
            <section className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    Bugünün özeti
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Günlük sayfada tüm linkler kaynaklara gider.
                  </p>
                </div>
                <a
                  className="text-sm text-muted hover:text-text"
                  href={`/ainews/d/${latest.date}`}
                >
                  Tümünü aç →
                </a>
              </div>
              <DailyCard
                date={latest.date}
                title={latest.title}
                excerpt={latest.excerpt}
              />
            </section>
          )}

          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Son 7 gün</h2>
                <p className="mt-1 text-sm text-muted">
                  Geçmiş özetlere hızlı erişim.
                </p>
              </div>
              <a className="text-sm text-muted hover:text-text" href="/ainews/archive">
                Arşiv →
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {index.slice(0, 7).map((d) => (
                <DailyCard
                  key={d.date}
                  date={d.date}
                  title={d.title}
                  excerpt={d.excerpt}
                />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
