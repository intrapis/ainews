import { getSources } from '../../lib/sources'

export default async function SourcesPage() {
  const sources = await getSources()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Kaynaklar</h1>
      <p className="text-muted">RSS kaynak listesi (site bu kaynaklardan derlenir).</p>

      <div className="overflow-hidden rounded-lg border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-muted">
            <tr>
              <th className="px-4 py-3">Kaynak</th>
              <th className="px-4 py-3">RSS</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((s) => (
              <tr key={s.url} className="border-t border-white/10">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">
                  <a className="text-text hover:underline" href={s.url}>
                    {s.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
