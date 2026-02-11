import { getSources } from '../../lib/sources'

import { Card, Container } from '../../components/ui'

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

        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-muted">
              <tr>
                <th className="px-4 py-3">Kaynak</th>
                <th className="px-4 py-3">RSS</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.url} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-text">{s.name}</td>
                  <td className="px-4 py-3">
                    <a className="text-muted hover:text-text" href={s.url}>
                      {s.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Container>
  )
}
