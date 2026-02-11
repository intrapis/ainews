import { getSources } from '../../lib/sources'

import { Container } from '../../components/ui'

export default async function SourcesPage() {
  const sources = await getSources()

  return (
    <Container>
      <div className="py-10 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Kaynaklar</h1>
          <p className="text-muted">
            RSS kaynak listesi (site bu kaynaklardan derlenir).
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-white/60">
          <table className="w-full text-sm">
            <thead className="bg-highlight text-left text-muted">
              <tr>
                <th className="px-4 py-3">Kaynak</th>
                <th className="px-4 py-3">RSS</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.url} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-ink">{s.name}</td>
                  <td className="px-4 py-3">
                    <a className="text-ink/70 hover:text-ink" href={s.url}>
                      {s.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}
