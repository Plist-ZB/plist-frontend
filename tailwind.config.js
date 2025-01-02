/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4854A2",
        "primary-light": "#F3F5FB",
        black: "#333333",
        "black-bright": "#404040",
        red: "#DC4646",
        "red-bright": "#F24822",
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
