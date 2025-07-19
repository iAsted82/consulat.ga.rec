import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '1cm': '28.35px',
      },
      colors: {
        // Couleurs Primaires
        primary: {
          DEFAULT: 'hsl(215, 95%, 25%)', // #0d40af
          foreground: 'hsl(0, 0%, 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(215, 25%, 27%)', // #3b4b6b
          foreground: 'hsl(0, 0%, 100%)',
        },
        'accent-gold': {
          DEFAULT: 'hsl(51, 100%, 60%)', // #ffd733
          foreground: 'hsl(0, 0%, 0%)',
        },
        // États
        success: 'hsl(142, 76%, 36%)', // #16a34a
        warning: 'hsl(38, 92%, 50%)', // #f59e0b
        error: 'hsl(0, 84%, 60%)', // #ef4444
        info: 'hsl(214, 100%, 50%)', // #007bff
        // Mode Clair
        background: 'hsl(0, 0%, 100%)',
        card: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(215, 20%, 11%)',
        },
        foreground: 'hsl(215, 20%, 11%)',
        // Autres couleurs nécessaires
        border: 'hsl(0, 0%, 89.8%)',
        input: 'hsl(0, 0%, 89.8%)',
        ring: 'hsl(215, 95%, 25%)',
        muted: {
          DEFAULT: 'hsl(0, 0%, 96.1%)',
          foreground: 'hsl(0, 0%, 45.1%)',
        },
        accent: {
          DEFAULT: 'hsl(0, 0%, 96.1%)',
          foreground: 'hsl(0, 0%, 9%)',
        },
        destructive: {
          DEFAULT: 'hsl(0, 84%, 60%)',
          foreground: 'hsl(0, 0%, 98%)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'scale-up': 'scaleUp 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;