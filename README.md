# ainews

TR AI news digest site.

## What it does
- GitHub Actions runs daily (09:00 TR ~ 06:00 UTC)
- Fetches RSS feeds listed in `content/sources.json`
- Writes a daily markdown digest to `content/daily/YYYY-MM-DD.md`
- Generates a site-level RSS at `public/rss.xml`
- Builds and deploys a static site to GitHub Pages

## Local dev
```bash
npm i
npm run rss:daily
npm run dev
```

## Build (static export)
```bash
npm run build
```

## Notes
- No paid providers / no LLM required.
- Add/remove feeds in `content/sources.json`.
