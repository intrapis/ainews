import { marked } from 'marked'

export function Markdown({ content }: { content: string }) {
  const html = marked.parse(content)
  return (
    <div
      className="prose prose-invert max-w-none prose-headings:tracking-tight prose-a:text-white prose-a:decoration-white/30 prose-a:hover:decoration-white/60 prose-strong:text-white prose-code:text-white prose-pre:bg-black/40 prose-pre:border prose-pre:border-border"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
