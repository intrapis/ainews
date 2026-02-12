import type { Article } from './article-list'

export function BriefStrip({ items, date }: { items: Article[]; date: string }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-xs tracking-[0.18em] text-white/60">THE BRIEF</div>
          <div className="mt-1 font-serif text-xl font-semibold text-white">
            {date}
          </div>
        </div>
        <a className="text-sm text-white/70 hover:text-white" href={`/ainews/d/${date}`}>
          Full digest →
        </a>
      </div>

      <ul className="mt-4 space-y-2">
        {items.slice(0, 10).map((it) => (
          <li key={it.url} className="text-sm">
            <a
              href={it.url}
              className="text-white/85 hover:text-white hover:underline"
            >
              {it.title}
            </a>
            {it.source ? (
              <span className="ml-2 text-xs text-white/55">— {it.source}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
