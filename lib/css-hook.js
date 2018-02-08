const hook = require('css-modules-require-hook');
const sass = require('node-sass');

hook({
  extensions: ['.scss'],
  preprocessCss: function (css, filename) {
    return sass.renderSync({
      data: css,
      file: filename
    }).css;
  },
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});
