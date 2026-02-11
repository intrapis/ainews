import './globals.css'
import type { Metadata } from 'next'
import { Header } from '../components/header'

export const metadata: Metadata = {
  title: 'AI Haber Özeti (TR)',
  description:
    'Her gün RSS kaynaklarından derlenen yapay zeka odaklı haber özeti. Ücretsiz, otomatik, GitHub Pages üzerinde yayınlanır.',
  metadataBase: new URL('https://github.com/intrapis/ainews'),
  openGraph: {
    title: 'AI Haber Özeti (TR)',
    description:
      'Her gün RSS kaynaklarından derlenen yapay zeka odaklı haber özeti.',
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
    <html lang="tr">
      <body>
        <div className="bg-grid">
          <Header />
          <main className="pb-16">{children}</main>
          <footer className="border-t border-border">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted">
              <p>
                Otomatik üretilir: RSS → günlük derleme. Kaynak linkleri içerir.
              </p>
              <p className="mt-1">
                Repo: <a href="https://github.com/intrapis/ainews">intrapis/ainews</a>
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
