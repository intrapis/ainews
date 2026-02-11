import { DailyCard } from '../components/daily-card'
import { getDailyIndex } from '../lib/content'

export default async function HomePage() {
  const index = await getDailyIndex()
  const latest = index[0]

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          AI Haber Özeti (TR)
        </h1>
        <p className="text-muted">
          Her gün (09:00 TR) seçili RSS kaynaklarından derlenen özet. “LLM yok”
          modunda başlık + 1 satır açıklama + link şeklinde yayınlanır.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <a className="rounded-md bg-white/5 px-3 py-1 hover:bg-white/10" href="/ainews/archive">
            Arşiv
          </a>
          <a
            className="rounded-md bg-white/5 px-3 py-1 hover:bg-white/10"
            href="/ainews/sources"
          >
            Kaynaklar
          </a>
          <a
            className="rounded-md bg-white/5 px-3 py-1 hover:bg-white/10"
            href="/ainews/rss.xml"
          >
            Site RSS
          </a>
        </div>
      </section>

      {!latest ? (
        <div className="rounded-lg border border-white/10 bg-card p-6">
          <p className="text-muted">Henüz günlük özet yok. İlk run bekleniyor.</p>
        </div>
      ) : (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Bugünün Özeti</h2>
          <DailyCard date={latest.date} title={latest.title} excerpt={latest.excerpt} />
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Son 7 gün</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {index.slice(0, 7).map((d) => (
            <DailyCard key={d.date} date={d.date} title={d.title} excerpt={d.excerpt} />
          ))}
        </div>
      </section>
    </div>
  )
}
