export function Header() {
  return (
    <header className="border-b border-white/10 bg-bg/60 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <a href="/ainews" className="font-semibold tracking-tight">
          ainews
        </a>
        <nav className="flex items-center gap-4 text-sm text-muted">
          <a className="hover:text-text" href="/ainews/archive">
            Arşiv
          </a>
          <a className="hover:text-text" href="/ainews/sources">
            Kaynaklar
          </a>
          <a className="hover:text-text" href="/ainews/rss.xml">
            RSS
          </a>
        </nav>
      </div>
    </header>
  )
}
