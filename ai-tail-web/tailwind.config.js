/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,less}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false, // 禁用 Tailwind 的 preflight，避免与现有样式冲突
  // }
}
