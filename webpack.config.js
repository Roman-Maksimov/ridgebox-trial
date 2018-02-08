const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

if (fs.existsSync('.env')) {
  require('dotenv').config();
}

// Environment variables which should be exported outside this module
const env = {
  projectRoot: path.resolve(__dirname),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CDN_URL: process.env.CDN_URL || '',
  XHR_PREFIX: process.env.XHR_PREFIX || '',
};

const isProduction = env.NODE_ENV === 'production';

console.log('\n> Building with NODE_ENV:', env.NODE_ENV);
console.log('> Project root:', env.projectRoot);


/**
 * Index of all the entry points of our app.
 * "core" stores vendor modules and core components like Header and Footer
 */
const entryPoints = {
  vendor: [
    'react',
    'react-dom',
    'isomorphic-fetch',
    'react-redux',
    'redux',
    'redux-form',
    'redux-thunk',
  ],
  bundle: './src/index.js',
};


const commonSCSSLoaders = [
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  },
];


const webpackConfig = {
  entry: entryPoints,

  output: {
    filename: isProduction ? '[name]-[chunkhash].js' : '[name].js',
    path: path.join(__dirname, 'public'),
    publicPath: `${env.CDN_URL}/`,
  },

  context: __dirname,

  resolve: {
    modules: [
      'node_modules',
      path.join(__dirname, 'src'),
    ],
    alias: {
      src: path.join(__dirname, 'src'),
    },
    extensions: ['.js', '.css', '.scss', '.html'],
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                minimize: false,
                importLoaders: 2,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          ].concat(commonSCSSLoaders),
        }),
      },
      {
        test: /\.s?css$/,
        include: [
          path.resolve(__dirname, 'src/styles'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: false,
              },
            },
          ].concat(commonSCSSLoaders),
        }),
      },

    ],
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'base'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      disable: !isProduction,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      cdnUrl: env.CDN_URL,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env.NODE_ENV),
      },
      CDN_URL: JSON.stringify(env.CDN_URL),
      XHR_PREFIX: JSON.stringify(env.XHR_PREFIX),
    }),
    new CopyWebpackPlugin([
      {
        // copy normalize.css (won't compile it into the bundle)
        from: 'node_modules/normalize.css/normalize.css',
        to: 'css',
      },
      {
        // copy fonts
        from: 'src/styles/fonts',
        to: 'fonts',
      },
      {
        // copy MDL css file
        from: 'node_modules/material-design-lite/material.min.css',
        to: 'css',
      },
      {
        // copy MDL css map file
        from: 'node_modules/material-design-lite/material.min.css.map',
        to: 'css',
      },
      {
        // copy MDL js file
        from: 'node_modules/material-design-lite/material.min.js',
        to: 'js',
      },
      {
        // copy MDL js Map file
        from: 'node_modules/material-design-lite/material.min.js.map',
        to: 'js',
      },
      {
        // copy test pics
        from: 'server/img',
        to: 'img',
      },
    ]),
  ],

  devtool: isProduction ? false : 'source-map',

  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },
};

if (isProduction) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    })
  );
}


module.exports = webpackConfig;
