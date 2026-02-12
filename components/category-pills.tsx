const CATS = [
  { key: 'research', label: 'Research' },
  { key: 'product', label: 'Product' },
  { key: 'policy', label: 'Policy' },
  { key: 'business', label: 'Business' }
] as const

export function CategoryPills() {
  return (
    <div className="flex flex-wrap gap-2">
      {CATS.map((c) => (
        <a
          key={c.key}
          href={`/ainews/c/${c.key}`}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/75 hover:bg-white/[0.08] hover:text-white"
        >
          {c.label}
        </a>
      ))}
    </div>
  )
}
