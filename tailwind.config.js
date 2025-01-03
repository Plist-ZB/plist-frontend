/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f3f5fb",
          100: "#e4e9f5",
          200: "#cfd9ee",
          300: "#adbfe3",
          400: "#869fd4",
          500: "#6981c8",
          600: "#5668ba",
          700: "#4854a2",
          800: "#424a8b",
          900: "#39406f",
          main: "#4854a2",
          light: "#F3F5FB",
        },
        white: "#ffffff",
        black: {
          DEFAULT: "#333333",
          bright: "#404040",
        },
        gray: {
          dark: "#888787",
          light: "#A7A7A7",
          border: "#d9d9d9",
        },
        red: {
          main: "#DC4646",
        },
        border: "#A7A7A7",
      },
      boxShadow: {
        top: "0px -2px 2px rgba(72, 84, 162, 0.03)",
      },
      spacing: {
        header: "60px",
        fnb: "72px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".scrollbar-default": {
          /* IE and Edge */
          "-ms-overflow-style": "auto",
          /* Firefox */
          "scrollbar-width": "auto",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "block",
          },
        },
        ".center": {
          "justify-content": "center",
          "align-items": "center",
        },
        ".pb-safe": {
          paddingBottom: "env(safe-area-inset-bottom)",
        },
      };
      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
