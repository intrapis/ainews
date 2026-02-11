import { marked } from 'marked'

export function Markdown({ content }: { content: string }) {
  const html = marked.parse(content)
  return (
    <div
      className="prose prose-invert max-w-none prose-a:text-text prose-a:underline-offset-4 prose-a:hover:underline prose-strong:text-text"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
