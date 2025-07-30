// Explicitly require the plugins
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    // Some plugins, like postcss-nested, need to run before Tailwind
    require('postcss-import'),
    
    // Tailwind CSS
    tailwindcss,
    
    // Autoprefixer should be last in the chain
    autoprefixer,
  ],
};
