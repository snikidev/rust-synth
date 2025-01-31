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
            }
          }, // light theme colors
        },
        dark: {
          colors: { 
            primary: {
            DEFAULT: "f06c01",
            foreground: "#000000",
          }}, // dark theme colors
        },
      },
    }),
  ],
};
