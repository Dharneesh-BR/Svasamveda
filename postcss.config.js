module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nesting'),       // Instead of tailwindcss/nesting
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};