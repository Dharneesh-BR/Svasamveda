module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b69 25%, #6b21a8 50%, #c026d3 75%, #e879f9 100%)',
        main: '#ffffff',
        accent: '#e9d5ff',
        text: '#d4d4d8',
        heading: '#fafafa',
      },
    },
  },
  plugins: [],
};
