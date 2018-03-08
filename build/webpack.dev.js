const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const autoprefixer = require('autoprefixer');
const chalk = require('chalk');

const config = merge(baseConfig, {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, '../.dev'),
    filename: 'js/[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: require.resolve('style-loader'),
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              minimize: true,
              sourceMap: process.env.NODE_ENV === 'production',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
          },
        ],
      },
    ],
  },
});

module.exports = config;
