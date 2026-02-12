import type { Article } from './article-list'
import { domainFromUrl, faviconUrlForDomain } from '../lib/url'

function CardShell({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur ' +
        className
      }
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.20),transparent_55%)]" />
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.14),transparent_55%)]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

export function HeroStory({ item }: { item: Article }) {
  const domain = domainFromUrl(item.url)
  const favicon = faviconUrlForDomain(domain, 64)

  return (
    <a href={item.url} className="block">
      <CardShell className="h-full">
        <div className="flex items-center gap-2 text-xs text-white/70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={favicon} alt="" className="h-5 w-5 rounded" />
          <span className="truncate">{item.source || domain}</span>
        </div>
        <div className="mt-3 font-serif text-2xl font-semibold leading-snug text-white">
          {item.title}
        </div>
        {item.description ? (
          <div className="mt-3 line-clamp-3 text-sm text-white/70">
            {item.description}
          </div>
        ) : null}
        <div className="mt-5 text-sm font-medium text-white/80 group-hover:text-white">
          Read →
        </div>
      </CardShell>
    </a>
  )
}

export function BentoCard({ item }: { item: Article }) {
  const domain = domainFromUrl(item.url)
  const favicon = faviconUrlForDomain(domain, 64)

  return (
    <a href={item.url} className="block">
      <CardShell className="h-full">
        <div className="flex items-center gap-2 text-xs text-white/70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={favicon} alt="" className="h-4 w-4 rounded" />
          <span className="truncate">{item.source || domain}</span>
        </div>
        <div className="mt-2 text-base font-semibold leading-snug text-white">
          {item.title}
        </div>
        {item.description ? (
          <div className="mt-2 line-clamp-2 text-sm text-white/70">
            {item.description}
          </div>
        ) : null}
      </CardShell>
    </a>
  )
}
