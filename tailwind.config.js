/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        court: {
          950: '#09090b',
          900: '#111111',
          800: '#191919',
          700: '#232323',
        },
        accent: {
          500: '#f97316',
          400: '#fb923c',
          300: '#fdba74',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(251,146,60,0.16), 0 20px 40px rgba(0,0,0,0.35)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(249,115,22,0.18)' },
          '50%': { boxShadow: '0 0 0 10px rgba(249,115,22,0.02)' },
        },
      },
      backgroundImage: {
        'court-grid':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
