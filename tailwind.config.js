/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.ejs'],
  theme: {
    extend: {
      colors: {
        brand: {
          text: '#403A49',
          bg: '#fbfbfe',
          primary: '#ffdb00',
          secondary: '#c8c6c7',
          accent: '#ffcc00',
          nav: '#003cd9',
          highlight: '#fbd14b',
          title: '#f34e49',
          neutral: '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#ffffff',
          'base-300': '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Commissioner', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Commissioner', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Commissioner', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Commissioner', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 0 #0000',
      },
    },
  },
  plugins: [],
};
