const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, '../.dev'),
    filename: 'js/[name].js',
    libraryTarget: 'umd',
  },
});

module.exports = config;
