/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        celo: {
          primary: '#FBCC5C',
          green: '#35D07F',
          dark: '#2E3338',
          darkBlue: '#1C1F24',
          gold: '#FBCC5C',
          forest: '#476520',
          purple: '#BF97FF',
        },
      },
      backgroundImage: {
        'gradient-celo': 'linear-gradient(135deg, #FBCC5C 0%, #35D07F 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1C1F24 0%, #2E3338 100%)',
        'gradient-purple': 'linear-gradient(135deg, #BF97FF 0%, #7B3FF2 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(251, 204, 92, 0.4)',
        'glow-green': '0 0 20px rgba(53, 208, 127, 0.4)',
      },
    },
  },
  plugins: [],
}
