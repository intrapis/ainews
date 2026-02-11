import { DailyCard } from '../../components/daily-card'
import { getDailyIndex } from '../../lib/content'

import { Container } from '../../components/ui'

export default async function ArchivePage() {
  const index = await getDailyIndex()

  return (
    <Container>
      <div className="py-10 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Arşiv</h1>
          <p className="text-muted">Tüm günlük özetler.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {index.map((d) => (
            <DailyCard
              key={d.date}
              date={d.date}
              title={d.title}
              excerpt={d.excerpt}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}
