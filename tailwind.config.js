/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Figma Design System Tokens (Light & Dark mapped to CSS vars)
        brand: {
          '-200': 'var(--brand-neg200, #F5FDEF)',
          0: 'var(--brand-0, #9BF168)',
          50: 'var(--brand-50, #93E967)',
          100: 'var(--brand-100, #8BE166)',
          200: 'var(--brand-200, #7CD164)',
          300: 'var(--brand-300, #6DC161)',
          400: 'var(--brand-400, #5DB15F)',
          500: 'var(--brand-500, #4EA15D)',
          600: 'var(--brand-600, #3E915B)',
          700: 'var(--brand-700, #2F8259)',
          800: 'var(--brand-800, #1F7156)',
          900: 'var(--brand-900, #106254)',
          1000: 'var(--brand-1000, #005252)',
          1200: 'var(--brand-1200, #003333)',
        },
        grey: {
          0: 'var(--grey-0, #FFFFFF)',
          50: 'var(--grey-50, #F3F3F3)',
          100: 'var(--grey-100, #E7E7E7)',
          200: 'var(--grey-200, #CECECE)',
          300: 'var(--grey-300, #B6B6B6)',
          400: 'var(--grey-400, #9D9D9D)',
          500: 'var(--grey-500, #848484)',
          600: 'var(--grey-600, #6C6C6C)',
          700: 'var(--grey-700, #545454)',
          800: 'var(--grey-800, #3B3B3B)',
          900: 'var(--grey-900, #232323)',
          950: 'var(--grey-950, #161616)',
          975: 'var(--grey-975, #161616)',
          1000: 'var(--grey-1000, #0A0A0A)',
        },
        rail: 'var(--rail-bg, #00342f)',
        panel: 'var(--panel-bg, #F5FDEF)',
        surface: 'var(--card-bg, #ffffff)',
        canvas: 'var(--canvas-bg, #f8faf8)',
        border: 'var(--border-color, #e2e8e4)',
      },
      fontFamily: {
        sans: ['"General Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"General Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        card: '0 4px 20px -2px rgba(0, 52, 47, 0.06)',
        popover: '0 12px 32px -4px rgba(0, 30, 20, 0.12)',
      }
    },
  },
  plugins: [],
};

