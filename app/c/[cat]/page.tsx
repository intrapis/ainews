import { notFound } from 'next/navigation'
import { Container, SectionTitle } from '../../../components/ui'
import { ArticleList } from '../../../components/article-list'
import { getDailyIndex } from '../../../lib/content'
import { getDigest } from '../../../lib/digest'

const CATS = ['research', 'product', 'policy', 'business'] as const

function label(cat: string) {
  switch (cat) {
    case 'research':
      return 'Research'
    case 'product':
      return 'Product'
    case 'policy':
      return 'Policy'
    case 'business':
      return 'Business'
    default:
      return cat
  }
}

function filterByCat(items: any[], cat: string) {
  const rx = {
    research: /(paper|arxiv|benchmark|dataset|model|weights|training|eval)/i,
    product: /(launch|release|ship|product|app|feature|pricing|api|beta)/i,
    policy: /(law|policy|regulat|copyright|ban|court|antitrust|security|governance)/i,
    business: /(funding|raises|series\s+[abcde]|valuation|acquir|ipo|revenue)/i
  } as const

  const re = (rx as any)[cat]
  if (!re) return []
  return items.filter((it) => re.test(it.title || ''))
}

export async function generateStaticParams() {
  return [
    { cat: 'research' },
    { cat: 'product' },
    { cat: 'policy' },
    { cat: 'business' }
  ]
}

export default async function CategoryPage({
  params
}: {
  params: { cat: string }
}) {
  const cat = params.cat
  if (!CATS.includes(cat as any)) return notFound()

  const index = await getDailyIndex()
  const latest = index[0]
  if (!latest) return notFound()

  const digest = await getDigest(latest.date)
  const items = filterByCat([...digest.top, ...digest.latest], cat)

  return (
    <Container>
      <div className="py-10 space-y-6">
        <SectionTitle
          title={label(cat)}
          subtitle={`${latest.date} · filtrelenmiş akış`}
        />

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5">
          <ArticleList items={items} />
        </div>
      </div>
    </Container>
  )
}
