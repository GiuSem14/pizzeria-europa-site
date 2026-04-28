/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F5F0E8',
          light: '#FAFAF7',
        },
        tomato: {
          DEFAULT: '#C0392B',
          dark: '#A93226',
          light: '#E74C3C',
        },
        gold: {
          DEFAULT: '#E8A020',
          dark: '#C8861A',
          light: '#F5B942',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          muted: '#4A4A4A',
          faint: '#7A7A7A',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

