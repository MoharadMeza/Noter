import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/libs/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#020817',
        card: '#ffffff',
        'card-foreground': '#020817',
        popover: '#ffffff',
        'popover-foreground': '#020817',
        primary: '#2563eb',
        'primary-foreground': '#f8fafc',
        secondary: '#f1f5f9',
        'secondary-foreground': '#020817',
        muted: '#f1f5f9',
        'muted-foreground': '#64748b',
        accent: '#f1f5f9',
        'accent-foreground': '#020817',
        destructive: '#ef4444',
        'destructive-foreground': '#f8fafc',
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#2563eb',
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
