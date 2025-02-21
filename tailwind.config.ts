import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    'theme-black': 'var(--theme-black)',
    'theme-white': 'var(--theme-white)',
    backgroundColor: {
      'theme-black': 'var(--theme-black)',
      'theme-white': 'var(--theme-white)',
      'theme-grey': 'var(--theme-grey)',
      'white': '#ffffff',
      'black': '#000000',
      'gray-500': '#6b7280',
    },
    textColor: {
      'theme-black': 'var(--theme-black)',
      'theme-white': 'var(--theme-white)',
      'gray-500': '#6b7280',
    },
    borderColor: {
      'theme-black': 'var(--theme-black)',
      'theme-white': 'var(--theme-white)',
    },
    boxShadow: {
      'theme-white': '0 0 10px 0 rgba(255, 255, 255, 0.5)',
      'theme-black': '0 0 10px 0 rgba(0, 0, 0, 0.5)',
    },
  },
  plugins: [],
} satisfies Config
