export type Article = {
  title: string
  url: string
  source?: string
  description?: string
  date?: string
}

import { domainFromUrl, faviconUrlForDomain } from '../lib/url'

export function ArticleList({
  items,
  showSource = true
}: {
  items: Article[]
  showSource?: boolean
}) {
  return (
    <ul className="divide-y divide-white/10">
      {items.map((it) => {
        const domain = domainFromUrl(it.url)
        const favicon = faviconUrlForDomain(domain, 32)

        return (
          <li key={it.url} className="py-3">
            <a href={it.url} className="group block">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {domain ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={favicon}
                        alt=""
                        className="mt-0.5 h-4 w-4 rounded"
                        loading="lazy"
                      />
                    ) : null}
                    <div className="min-w-0">
                      <div className="font-medium leading-snug text-white/90 group-hover:text-white group-hover:underline">
                        {it.title}
                      </div>
                      {it.description ? (
                        <div className="mt-1 line-clamp-2 text-sm text-white/60">
                          {it.description}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="shrink-0 text-xs text-white/55">
                  {showSource ? it.source || domain : it.date}
                </div>
              </div>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
