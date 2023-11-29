/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-background': "url('/src/assets/auth-background.jpg')",
      }
    },
  },
  plugins: [],
}

