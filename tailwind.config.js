/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#39B2A3',       // Primary Teal / Turquoise from reference
          tealDark: '#2A9487',
          tealLight: '#EAF8F6',
          coral: '#F56A53',      // Coral Accent from reference
          coralHover: '#E5563F',
          coralLight: '#FFF1EE',
          amber: '#F8C423',      // Warm Yellow Accent from reference
          amberLight: '#FEF9E6',
          blue: '#33A698',       // Harmonized primary accent mapped to teal
          blueHover: '#288E82',
          blueLight: '#EAF8F6',
          cyan: '#49BFB0',       // Secondary Mint Teal
          cyanHover: '#35A395',
          cyanLight: '#ECFBF9',
          purple: '#7C69EF',     // AI Accent Violet
          purpleHover: '#6753DC',
          purpleLight: '#F4F2FF',
          dark: '#1A2332',       // Crisp Deep Slate/Navy Text
          slate: '#6B7280',      // Supporting Muted Grey
          bg: '#F4F6F9',         // Soft Light Grey Canvas
          surface: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E8EDF3',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(26, 35, 50, 0.05), 0 1px 3px -1px rgba(26, 35, 50, 0.03)',
        'card': '0 10px 30px -10px rgba(26, 35, 50, 0.08), 0 2px 8px -2px rgba(26, 35, 50, 0.04)',
        'card-hover': '0 18px 36px -12px rgba(26, 35, 50, 0.12), 0 6px 14px -4px rgba(26, 35, 50, 0.05)',
        'pill': '0 8px 24px -6px rgba(26, 35, 50, 0.10), 0 2px 6px -2px rgba(26, 35, 50, 0.04)',
      }
    },
  },
  plugins: [],
}
