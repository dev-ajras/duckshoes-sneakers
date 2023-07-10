/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E8A7A6',
        primaryLight: '#FAD3D2',
        secondary: '#6C8EAD',
        background: '#262626',
        backgroundv2: '#594A48',
        body: '#F9F9F9',
      },
    },
  },
  plugins: [],
};
