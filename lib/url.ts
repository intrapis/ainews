export function domainFromUrl(url: string): string {
  try {
    const u = new URL(url)
    return u.hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

export function faviconUrlForDomain(domain: string, size = 64): string {
  if (!domain) return ''
  // Google S2 favicon service is simple and reliable for news-style lists.
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`
}
