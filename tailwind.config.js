/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // still needed for @custom-variant
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // semantic names you’ll use in your classes
        background: "var(--color-bg)",
        text: "var(--color-text)",
        card: "var(--color-card)",
      },
    },
  },
  plugins: [],
};
