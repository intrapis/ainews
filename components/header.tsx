import { Masthead } from './masthead'
import { Container } from './ui'

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <Masthead />
      <div className="border-b border-white/10 bg-[#070A12]/55 backdrop-blur">
        <Container>
          <nav className="flex flex-wrap items-center gap-4 py-3 text-sm text-white/70">
            <a className="hover:text-white" href="/ainews">
              Home
            </a>
            <a className="hover:text-white" href="/ainews/c/research">
              Research
            </a>
            <a className="hover:text-white" href="/ainews/c/product">
              Product
            </a>
            <a className="hover:text-white" href="/ainews/c/policy">
              Policy
            </a>
            <a className="hover:text-white" href="/ainews/c/business">
              Business
            </a>
            <span className="text-white/30">|</span>
            <a className="hover:text-white" href="/ainews/archive">
              Archive
            </a>
            <a className="hover:text-white" href="/ainews/sources">
              Sources
            </a>
            <a className="hover:text-white" href="/ainews/rss.xml">
              RSS
            </a>
          </nav>
        </Container>
      </div>
    </header>
  )
}
