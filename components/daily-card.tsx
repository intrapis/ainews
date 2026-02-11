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
      className="block rounded-xl border border-border bg-white/60 p-4 hover:bg-highlight"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-medium leading-snug">{title}</h3>
        <span className="shrink-0 text-xs text-muted">{date}</span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-muted">{excerpt}</p>
    </a>
  )
}
