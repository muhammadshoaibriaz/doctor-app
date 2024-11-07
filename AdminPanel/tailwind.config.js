/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        48: "48%",
        49: "49%",
        40: "40%",
        58: "58%",
        33: "33%",
      },
      minHeight: {
        90: "90vh",
      },
    },
  },
  plugins: [],
};
