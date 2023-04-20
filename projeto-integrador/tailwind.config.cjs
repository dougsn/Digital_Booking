const {fontFamily} = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        green: "#1dbeb4",
        "darker-green": "#29807a",
        "pastel-purple": "#545776",
        "dark-purple": "#383b58",
        white: "#fff",
        "ice-white": "#f3f1ed",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
