/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EA8C8A",
        primaryDark: "#D4605E",
        primaryExtraDark: "#A62927",
        primaryLight: "#FDC8C7",
        secondary: "#6C8EAD",
        background: "#13171D",
        backgroundDark: "#0E1217",
        grayDuck: "#4C4B4B",
        body: "#EFEFEF",
      },
      fontFamily: {
        outfit: ["Outfit"],
      },
    },
  },
  plugins: [],
};
