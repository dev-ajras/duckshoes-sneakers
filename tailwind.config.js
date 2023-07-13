/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#EA8C8A',
        primaryDark: '#D4605E',
        primaryLight: '#FAD3D2',
        secondary: '#6C8EAD',
        background: '#262626',
        backgroundv2: '#594A48',
        body: '#EFEFEF',
      },
    },
  },
  plugins: [],
};
