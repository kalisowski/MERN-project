/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '576px',
      md: '850px',
      lg: '1250px',
      xl: '1650px',
      '2xl': '2050px',
    },
    extend: {},
  },
  plugins: [require('daisyui')],
};
