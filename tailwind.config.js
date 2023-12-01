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
        title: ['Oswald', 'sans-serif'],
      },
      fontSize: {
        bigTask: ['6rem', '1'],
        bigMaster: ['3.8rem', '1'],
      },
      padding: {
        title: '40%',
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
