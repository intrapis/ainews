import { DailyCard } from '../../components/daily-card'
import { getDailyIndex } from '../../lib/content'

export default async function ArchivePage() {
  const index = await getDailyIndex()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Arşiv</h1>
      <p className="text-muted">Tüm günlük özetler.</p>

      <div className="grid gap-4 md:grid-cols-2">
        {index.map((d) => (
          <DailyCard key={d.date} date={d.date} title={d.title} excerpt={d.excerpt} />
        ))}
      </div>
    </div>
  )
}
