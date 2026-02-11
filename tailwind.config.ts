import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#fbf7ef',
        ink: '#111111',
        muted: 'rgba(17,17,17,0.65)',
        border: 'rgba(17,17,17,0.12)',
        highlight: 'rgba(17,17,17,0.04)'
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)']
      }
    }
  },
  plugins: [typography]
}

export default config
