const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./layouts/**/*.html', './src/**/*.vue', './src/**/*.js'],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
    cssnano({ preset: 'default' }),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
