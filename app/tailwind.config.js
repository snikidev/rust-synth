// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      animation: {
        shake: "shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#fff",
            foreground: "#000",
            primary: {
              DEFAULT: "#F06C01",
              foreground: "#fff",
            },
          }, // light theme colors
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "f06c01",
              foreground: "#000000",
            },
          }, // dark theme colors
        },
      },
    }),
  ],
};
