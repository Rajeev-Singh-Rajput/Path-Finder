// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // 1️⃣ Tell Tailwind which files to scan for class names:
  content: [
    "./index.html",           // your main HTML
    "./src/**/*.{js,jsx,ts,tsx}" // all React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
