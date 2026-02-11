import { Container } from './ui'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-4">
          <a href="/ainews" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-brand to-brand2" />
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
      </Container>
    </header>
  )
}
