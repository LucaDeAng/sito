/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4D00', // Vibrant orange-red
          50: '#FFF1ED',
          100: '#FFE2D9',
          200: '#FFC5B0',
          300: '#FFA988',
          400: '#FF8C5F',
          500: '#FF6E37',
          600: '#FF4D00',
          700: '#CC3E00',
          800: '#992F00',
          900: '#662000',
        },
        secondary: {
          DEFAULT: '#0A84FF', // Electric blue
          50: '#E0F1FF',
          100: '#C2E3FF',
          200: '#85C7FF',
          300: '#47ACFF',
          400: '#0A84FF',
          500: '#0070E0',
          600: '#005CB6',
          700: '#00478C',
          800: '#003362',
          900: '#001F38',
        },
        accent: {
          DEFAULT: '#9C00FF', // Vibrant purple
          50: '#F2E0FF',
          100: '#E5C2FF',
          200: '#CB85FF',
          300: '#B247FF',
          400: '#9C00FF',
          500: '#7B00CC',
          600: '#5E0099',
          700: '#440066',
          800: '#2B0033',
          900: '#120000',
        },
        neo: {
          DEFAULT: '#00FFAB', // Neon green
          50: '#E0FFF5',
          100: '#C2FFEB',
          200: '#85FFD9',
          300: '#47FFC6',
          400: '#00FFAB',
          500: '#00CC89',
          600: '#009966',
          700: '#006644',
          800: '#003322',
          900: '#000F00',
        },
        dark: {
          DEFAULT: '#0A0A0F', // Near black
          50: '#F0F0F2',
          100: '#E1E1E5',
          200: '#C3C3CC',
          300: '#A5A5B2',
          400: '#888899',
          500: '#6A6A7F',
          600: '#4C4C65',
          700: '#2E2E4C',
          800: '#1C1C32',
          900: '#0A0A19',
          950: '#0A0A0F',
        },
        light: {
          DEFAULT: '#F8F8FC', // Off-white
          50: '#FFFFFF',
          100: '#FCFCFE',
          200: '#F8F8FC',
          300: '#E0E0F0',
          400: '#C8C8E5',
          500: '#AFAFD9',
          600: '#9797CE',
          700: '#7E7EC3',
          800: '#6666B7',
          900: '#4F4FAC',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'grotesk': ['Space Grotesk', 'sans-serif'],
        'mono': ['Major Mono Display', 'monospace'],
        'serif': ['Bodoni Moda', 'serif'],
        'retro': ['VT323', 'monospace'],
      },
      fontSize: {
        'title-xxl': ['8rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'title-xl': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'title-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'title': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'subtitle': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'subheading': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['1.25rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em', textTransform: 'uppercase' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url('/noise.png')",
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-5px, 5px)' },
          '40%': { transform: 'translate(-5px, -5px)' },
          '60%': { transform: 'translate(5px, 5px)' },
          '80%': { transform: 'translate(5px, -5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.neo.DEFAULT), 0 0 20px theme(colors.neo.DEFAULT)',
        'neon-lg': '0 0 10px theme(colors.neo.DEFAULT), 0 0 30px theme(colors.neo.DEFAULT), 0 0 50px theme(colors.neo.DEFAULT)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};