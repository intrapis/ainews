'use client'

import { useMemo } from 'react'
import type { Article } from './article-list'
import { domainFromUrl, faviconUrlForDomain } from '../lib/url'

export function TopSlider({ items }: { items: Article[] }) {
  const cards = useMemo(() => {
    return items.slice(0, 5).map((it) => {
      const domain = domainFromUrl(it.url)
      return {
        ...it,
        domain,
        favicon: faviconUrlForDomain(domain, 64)
      }
    })
  }, [items])

  return (
    <div className="rounded-xl border border-border bg-white/60">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-xs tracking-[0.16em] text-muted">TOP STORIES</div>
        <div className="text-xs text-muted">kaydır →</div>
      </div>
      <div className="h-px bg-border" />

      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-5">
        {cards.map((it) => (
          <a
            key={it.url}
            href={it.url}
            className="snap-start min-w-[280px] max-w-[340px] flex-1 rounded-lg border border-border bg-white/70 p-4 hover:bg-highlight"
          >
            <div className="flex items-center gap-2">
              {it.domain ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={it.favicon}
                  alt=""
                  className="h-5 w-5 rounded"
                  loading="lazy"
                />
              ) : null}
              <div className="text-xs text-muted">{it.source || it.domain}</div>
            </div>
            <div className="mt-2 font-serif text-lg font-semibold leading-snug">
              {it.title}
            </div>
            {it.description ? (
              <div className="mt-2 line-clamp-3 text-sm text-muted">
                {it.description}
              </div>
            ) : null}
          </a>
        ))}
      </div>
    </div>
  )
}
