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
          blue: '#1D4ED8',      // Primary Deep Blue
          blueHover: '#1E40AF',
          blueLight: '#EFF6FF',
          cyan: '#06B6D4',      // Secondary Cyan
          cyanHover: '#0891B2',
          cyanLight: '#ECFEFF',
          purple: '#8B5CF6',    // AI Accent Purple
          purpleHover: '#7C3AED',
          purpleLight: '#F5F3FF',
          dark: '#0F172A',      // Main Text Dark Navy
          slate: '#64748B',     // Supporting Slate Grey
          bg: '#F8FAFC',        // Light grey background
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
}
