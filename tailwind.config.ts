import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cinzel)'],
      },
      colors: {
        mystic: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          700: '#6d28d9',
          900: '#4c1d95',
        },
      },
    },
  },
  plugins: [],
}
export default config 