/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "tree-poppy": {
          50: "#fffbea",
          100: "#fff2c5",
          200: "#ffe685",
          300: "#ffd246",
          400: "#ffbd1b",
          500: "#ff9900",
          600: "#e27200",
          700: "#bb4d02",
          800: "#983b08",
          900: "#7c310b",
          950: "#481700",
        },
        mandy: {
          50: "#fef2f2",
          100: "#fde7e6",
          200: "#fbd0d1",
          300: "#f7aaac",
          400: "#f27a80",
          500: "#e84855",
          600: "#d42a40",
          700: "#b31d34",
          800: "#961b32",
          900: "#801b31",
          950: "#470a16",
        },
        "midnight-moss": {
          50: "#f2f8f1",
          100: "#e0efdc",
          200: "#c1debc",
          300: "#92c68f",
          400: "#61a85f",
          500: "#3e8b3f",
          600: "#2c6f2e",
          700: "#245827",
          800: "#1e4720",
          900: "#1a3a1d",
          950: "#071108",
        },
        mahogany: {
          50: "#fff0f0",
          100: "#ffdddd",
          200: "#ffc1c1",
          300: "#ff9696",
          400: "#ff5a5a",
          500: "#ff2727",
          600: "#fb0707",
          700: "#d40101",
          800: "#ae0606",
          900: "#900c0c",
          950: "#570000",
        },
        alabaster: {
          50: "#fafafa",
          100: "#efefef",
          200: "#dcdcdc",
          300: "#bdbdbd",
          400: "#989898",
          500: "#7c7c7c",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3d3d3d",
          950: "#292929",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        primary: "0px 6px 0px #ffbd1b",
        secondary: "0px 6px 0px #989898",
        none: "none",
        nav: "0px -6px 0px #656565",
        "tree-poppy-500": "0px 6px 0px #ff9900",
        "tree-poppy-500-press": "0px 2px 0px #ff9900",
        "tree-poppy-300": "0px 4px 0px #ffd246",
        "mahogany-300": "0px 4px 0px #ff9696",
        "midnight-300": "0px 4px 0px #92c68f",
      },
      borderWidth: {
        3: "3px",
      },
      width: {
        100: "100%",
        90: "90%",
        auto: "auto"
      },
      minWidth: {
        "1/2": "50%"
      },
      minHeight: {
        "badge": "240px"
      },
      margin: {
        "auto-h": "auto 0",
        "auto-v": "0 auto"
      },
      zIndex: {
        100: "100",
        500: "500",
      },
    },
  },
  plugins: [],
};
