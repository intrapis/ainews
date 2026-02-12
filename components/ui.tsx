export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>
}

export function Divider({ className = '' }: { className?: string }) {
  return <div className={`h-px w-full bg-white/10 ${className}`} />
}

export function SectionTitle({
  title,
  subtitle
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="space-y-1">
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {subtitle ? <p className="text-sm text-white/60">{subtitle}</p> : null}
    </div>
  )
}
