/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        espresso: '#1A0D07',
        graphite: '#121212',
        offwhite: '#FBF9F5',
        cream: '#FFF8EE',
        caramel: '#C87D38',
        amberNeon: '#FF9F1C',
        volt: '#10B981',
      }
    }
  },
  plugins: [],
}
