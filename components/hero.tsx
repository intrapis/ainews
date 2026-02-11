import { Card, Container, Pill } from './ui'

export function Hero({
  latestDate,
  totalDays
}: {
  latestDate?: string
  totalDays: number
}) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute top-24 left-1/3 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand2/15 blur-3xl" />
      </div>

      <Container>
        <div className="py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <Pill>TR • Günlük</Pill>
            <Pill>RSS tabanlı</Pill>
            <Pill>09:00 (TR) otomatik</Pill>
            <Pill>{totalDays} gün arşiv</Pill>
          </div>

          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Yapay Zeka haberleri — her sabah tek sayfada.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-muted md:text-lg">
            Seçili kaynaklardan otomatik derlenen günlük digest. Her madde kaynağa
            link verir. Hızlı tarama için tasarlandı.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="/ainews/rss.xml"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-text hover:bg-white/15"
            >
              Site RSS
            </a>
            <a
              href={latestDate ? `/ainews/d/${latestDate}` : '/ainews/archive'}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand to-brand2 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-95"
            >
              Bugünün özeti
            </a>
            <a
              href="/ainews/sources"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-white/5 px-4 py-2 text-sm font-medium text-text hover:bg-white/10"
            >
              Kaynaklar
            </a>
          </div>

          <div className="mt-8">
            <Card className="p-5 md:p-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-muted">Son güncelleme</p>
                  <p className="text-lg font-semibold">
                    {latestDate ? latestDate : 'Henüz yok'}
                  </p>
                </div>
                <div className="text-sm text-muted">
                  Not: İlk deploy sonrası cron her gün otomatik günceller.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}
