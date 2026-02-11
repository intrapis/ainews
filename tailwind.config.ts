import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0f17',
        card: '#111827',
        text: '#e5e7eb',
        muted: '#9ca3af',
        brand: '#7c3aed'
      }
    }
  },
  plugins: []
}

export default config
