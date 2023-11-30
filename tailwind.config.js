/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './client/**/*.[tj]sx', './client/**/*.[tj]sx'],
  media: false,
  theme: {
    extend: {
      colors: {
        primary: '#FFFBF5',
        primaryBeige: '#F7EFE5',
        lightPurple: '#C3ACD0',
        darkPurple: '#7743DB',
        darkNavy: '#0A0047',
        warning: '#F27C7C',
      },
      fontFamily: {
        serif: ['Bree Serif', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

// for the logo
// font-family: 'Oswald', sans-serif;
