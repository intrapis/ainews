import './globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Sans, Source_Serif_4 } from 'next/font/google'
import { Header } from '../components/header'

const fontSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans'
})

const fontSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: 'AI News Brief (TR) — ainews',
  description:
    'Her gün RSS kaynaklarından derlenen yapay zeka haber özeti. Minimal, hızlı, link odaklı.',
  openGraph: {
    title: 'AI News Brief (TR) — ainews',
    description: 'Minimal, hızlı, link odaklı günlük AI news brief.',
    type: 'website'
  },
  robots: { index: true, follow: true }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body>
        <div className="paper min-h-screen">
          <Header />
          <main className="pb-16">{children}</main>
          <footer className="border-t border-border">
            <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <p>
                  Otomatik üretilir: RSS → günlük derleme. Her madde kaynağa link verir.
                </p>
                <p>
                  <a href="https://github.com/intrapis/ainews">GitHub</a>
                  <span className="px-2">·</span>
                  <a href="/ainews/rss.xml">RSS</a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
