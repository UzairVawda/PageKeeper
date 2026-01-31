/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF7',
          100: '#FFF9E6',
          200: '#FFF3CC',
          300: '#FFEDB3',
          400: '#FFE699',
          500: '#F5E6D3',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        brown: {
          50: '#FAF5F0',
          100: '#F5EBE0',
          200: '#E6D5C3',
          300: '#D4B896',
          400: '#C4A574',
          500: '#A67C52',
          600: '#8B5E3C',
          700: '#6F4E37',
          800: '#5D4037',
          900: '#4A3428',
        },
      },
    },
  },
  plugins: [],
};
