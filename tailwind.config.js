/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        corpNavy: '#0B192C',
        corpNavyLight: '#1E293B',
        corpSky: '#38BDF8',
        corpWhite: '#FFFFFF',
        corpLightBg: '#F8FAFC',
        corpDarkText: '#0F172A',
        corpMutedText: '#475569',
        corpBorder: '#E2E8F0',
      },
    },
  },
  plugins: [],
}
