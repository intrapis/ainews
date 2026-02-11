import { Masthead } from './masthead'
import { Container } from './ui'

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <Masthead />
      <div className="border-b border-border bg-paper/80 backdrop-blur">
        <Container>
          <nav className="flex items-center gap-5 py-3 text-sm">
            <a className="text-ink/80 hover:text-ink" href="/ainews">
              Ana Sayfa
            </a>
            <a className="text-ink/80 hover:text-ink" href="/ainews/archive">
              Arşiv
            </a>
            <a className="text-ink/80 hover:text-ink" href="/ainews/sources">
              Kaynaklar
            </a>
            <span className="text-ink/30">|</span>
            <a className="text-ink/80 hover:text-ink" href="/ainews/rss.xml">
              RSS
            </a>
          </nav>
        </Container>
      </div>
    </header>
  )
}
