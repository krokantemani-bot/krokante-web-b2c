/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
