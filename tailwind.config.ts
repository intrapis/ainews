import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070A12',
        surface: '#0B1220',
        card: 'rgba(255,255,255,0.06)',
        border: 'rgba(255,255,255,0.10)',
        text: '#EEF2FF',
        muted: 'rgba(238,242,255,0.70)',
        brand: '#7C3AED',
        brand2: '#22D3EE'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: [typography]
}

export default config
