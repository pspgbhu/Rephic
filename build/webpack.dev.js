const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const baseConfig = require('./webpack.base');

// add hot-reload related code to entry chunks
// Object.keys(baseConfig.entry).forEach((name) => {
//   baseConfig.entry[name] = [
//     'webpack-hot-middleware/client?noInfo=true&reload=true',
//   ].concat(baseConfig.entry[name]);
// });

const config = merge(baseConfig, {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, '../node_modules/.cache/rephic/public'),
    filename: 'js/[name].js',
    publicPath: '/',
  },

  devtool: 'cheap-module-source-map',
});

module.exports = config;
