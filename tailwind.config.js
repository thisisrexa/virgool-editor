/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: ["Vazirmatn", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
};
