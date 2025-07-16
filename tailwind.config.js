/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF3F6C',
        secondary: '#282C3F',
        accent: '#FF3F6C',
        surface: '#FFFFFF',
        background: '#FAFBFC',
        success: '#03A685',
        warning: '#FF9800',
        error: '#F16565',
        info: '#526BFF',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'cursive'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-subtle': 'bounce 0.5s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },
    },
  },
  plugins: [],
}