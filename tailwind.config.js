/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './client/**/*.[tj]sx'],
  media: false,
  theme: {
    extend: {
      colors: {
        primary: '#FFFBF5',
        primaryBeige: '#F7EFE5',
        lightPurple: '#C3ACDO',
        darkPurple: '#7743DB',
        darkNavy: '#0A0047',
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
