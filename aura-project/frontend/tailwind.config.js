/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0f172a',
        'cyber-darker': '#0a0e27',
      },
    },
  },
  plugins: [],
}
