/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10201c",
        moss: "#42675b",
        aqua: "#00a6a6",
        limewash: "#d9ef63",
        paper: "#f7f4ec",
        night: "#07130f"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 80px rgba(0, 166, 166, 0.22)"
      }
    }
  },
  plugins: []
};
