/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './client/**/*.[tj]sx'],
  media: false,
  theme: {
    extend: {
      colors: {
        primary: '#FF17CE',
        primaryLighter: '#FF80E4',
        darkPurple: '#1B0636',
        lightPurple: '#B07CF2',
        extraLightPurple: '#E0C8FF',
        warning: '#F27C7C',
      },
      fontFamily: {
        serif: ['"Roboto Slab"', 'serif'],
        sans: ['Quicksand', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
