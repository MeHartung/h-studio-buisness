import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        card: 'var(--card)',
        muted: 'var(--muted)',
        text: 'var(--text)',
        brand: 'var(--brand)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        display: ['Inter Tight', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['56px', { lineHeight: '64px', letterSpacing: '-0.02em' }],
        'display-2': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em' }],
        'display-3': ['28px', { lineHeight: '36px' }],
      },
    },
  },
  plugins: [],
} satisfies Config;

