/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.ejs'],
  theme: {
    extend: {
      colors: {
        brand: {
          text: '#040316',
          bg: '#fbfbfe',
          primary: '#ffdb00',
          secondary: '#c8c6c7',
          accent: '#ffcc00',
          'base-100': '#fbfbfe',
          'base-200': '#f3f3f9',
          'base-300': '#e7e7f2',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 14px 35px rgba(4, 3, 22, 0.08)',
      },
    },
  },
  plugins: [],
};
