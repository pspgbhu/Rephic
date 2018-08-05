const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = merge(baseConfig, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../../server/public'),
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js',
  },

  plugins: [
    new UglifyJSPlugin(),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
        },
      },
    },
  },

});

module.exports = config;
