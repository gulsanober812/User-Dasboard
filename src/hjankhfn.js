module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3B82F6',
          700: '#1D4ED8',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}