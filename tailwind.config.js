/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#F4F9FD',
          100: '#E7F2FA',
          200: '#D2E7F6',
          300: '#B6D8F1',
          400: '#94C3EA',
          500: '#6DA9E0',
          cloud: '#F0F6FC',
          base: '#98B7D4',
          deep: '#7FA8D0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'cloud': '0 20px 40px -15px rgba(255, 255, 255, 0.7), 0 10px 25px -10px rgba(70, 115, 160, 0.15)',
        'pill-dark': '0 8px 24px -4px rgba(0, 0, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
