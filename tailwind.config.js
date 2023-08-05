/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#EA8C8A',
        primaryDark: '#D4605E',
        primaryLight: '#FDC8C7',
        secondary: '#6C8EAD',
        background: '#262626',
        backgroundv2: '#594A48',
        grayDuck: '#4C4B4B',
        body: '#EFEFEF',
      },
      fontFamily: {
        outfit: ['Outfit'],
      },
      clipPath: {
        custom:
          'polygon(12% 24%, 29% 16%, 41% 12%, 54% 25%, 58% 36%, 69% 42%, 81% 44%, 93% 51%, 98% 65%, 90% 74%, 73% 78%, 46% 80%, 29% 80%, 8% 75%, 4% 69%, 5% 57%, 6% 39%)',
      },
    },
  },
  plugins: [],
};
