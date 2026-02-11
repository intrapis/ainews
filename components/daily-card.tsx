import { Card } from './ui'

export function DailyCard({
  date,
  title,
  excerpt
}: {
  date: string
  title: string
  excerpt: string
}) {
  return (
    <a href={`/ainews/d/${date}`} className="group block">
      <Card className="p-5 transition hover:border-white/20 hover:bg-white/[0.08]">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-pretty font-semibold leading-snug group-hover:text-white">
            {title}
          </h3>
          <span className="shrink-0 rounded-full border border-border bg-white/5 px-2 py-1 text-[11px] text-muted">
            {date}
          </span>
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-muted">{excerpt}</p>
      </Card>
    </a>
  )
}
