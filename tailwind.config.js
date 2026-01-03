module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'linear-gradient(135deg, #2d1b69 0%, #5b3fa8 20%, #8b5cf6 40%, #a78bfa 60%, #c4b5fd 80%, #ddd6fe 100%)',
        main: '#ffffff',
        accent: '#e9d5ff',
        text: '#d4d4d8',
        heading: '#fafafa',
      },
    },
  },
  plugins: [],
};
