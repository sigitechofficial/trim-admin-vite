/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chivo: ["Chivo", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        workSans: ["Work Sans", "sans-serif"],
      },
      backgroundColor: {
        themeBlue: "#12466F",
        themeGray: "#FAFAFA",
        homeCards: "#FFFFFFBF",
        themePink: "#EEC1FD",
        themeSkyBlue: "#ADEEF5",
        themeYellow: "#FADD81",
        themeLightGreen: "#21965314"
      },
      colors: {
        theme: "#12466F",
        labelColor: "#00000099",
        inputBorder: "#00000033",
        themeLightGray: "#8F95B2",
        themeGreen: "#219653",
        secondary: "#64748B",
        dark: "#1E293B",
        tabColor: "#12466F1A"
      },
      backgroundImage: {
        texture: "url('/images/texture.webp')",
        homeGradient: "linear-gradient(90deg, #CD7E31 0%, #D2AE37 75.52%)",
      },
      boxShadow: {
        textShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      },
    },
  },
  plugins: [],
}