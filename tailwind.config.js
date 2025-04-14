/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
      },
      colors: {
        'midnight': {
          DEFAULT: '#0A0B1A',
          light: '#1A1B2A',
        },
        'gold': {
          DEFAULT: '#FFB800',
          light: '#FFD700',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flicker': 'flicker 1.5s ease-in-out infinite alternate'
      },
      keyframes: {
        glow: {
          '0%': { opacity: 0.7 },
          '100%': { opacity: 1 }
        },
        flicker: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': {
            opacity: 1,
            filter: 'brightness(1)',
            transform: 'scale(1)'
          },
          '20%, 24%, 55%': { 
            opacity: 0.8,
            filter: 'brightness(1.2)',
            transform: 'scale(1.05)'
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
} 