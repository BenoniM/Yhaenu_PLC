/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Naked Power', 'sans-serif'],
        'naked-power': ['Naked Power', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

