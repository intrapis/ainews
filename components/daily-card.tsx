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
    <a
      href={`/ainews/d/${date}`}
      className="block rounded-lg border border-white/10 bg-card p-5 hover:border-white/20"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold">{title}</h3>
        <span className="shrink-0 text-xs text-muted">{date}</span>
      </div>
      <p className="mt-2 line-clamp-3 text-sm text-muted">{excerpt}</p>
    </a>
  )
}
