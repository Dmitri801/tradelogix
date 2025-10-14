/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tradelogix: {
          dark: '#0F172A', // gray-950, dark mode background
          light: '#F9FAFB', // gray-50, light mode background
          emerald: '#10B981', // emerald-500, buttons/profits
          'emerald-hover': '#059669', // emerald-600, hover states
          rose: '#F43F5E', // rose-500, losses/errors
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Robinhood-inspired typography
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enables dark/light mode via class toggle
};