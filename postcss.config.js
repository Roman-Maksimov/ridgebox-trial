module.exports = {
  plugins: [
    // uses browser list from 'browserslist' in package.json
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
      safe: true,
    }),
  ]
}
