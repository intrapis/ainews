export type Article = {
  title: string
  url: string
  source?: string
  description?: string
  date?: string
}

export function ArticleList({
  items,
  showSource = true
}: {
  items: Article[]
  showSource?: boolean
}) {
  return (
    <ul className="divide-y divide-border">
      {items.map((it) => (
        <li key={it.url} className="py-3">
          <a href={it.url} className="group block">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium leading-snug group-hover:underline">
                  {it.title}
                </div>
                {it.description ? (
                  <div className="mt-1 text-sm text-muted line-clamp-2">
                    {it.description}
                  </div>
                ) : null}
              </div>
              <div className="shrink-0 text-xs text-muted">
                {showSource ? it.source : it.date}
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}
