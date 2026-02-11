export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>
}

export function Card({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={
        'rounded-2xl border border-border bg-card shadow-soft backdrop-blur ' +
        className
      }
    >
      {children}
    </div>
  )
}

export function Pill({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-muted">
      {children}
    </span>
  )
}
