/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        'kindy-blue': '#0D6BBE',
        'kindy-dark-blue': '#0C4B65',
        'kindy-orange': '#F98100',
        'kindy-yellow': '#FCCB67',
        'kindy-gray': '#F7F5EF',
        'font-color': '#3A4374'
      },
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
        'dancing-script': ['Dancing Script', 'cursive'],
      }
    }
    ,
  },
  plugins: [],
}

