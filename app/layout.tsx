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
        <Header />
        <main className="mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted">
            <p>
              Otomatik üretilir: RSS → günlük derleme. Kaynak linkleri içerir.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
