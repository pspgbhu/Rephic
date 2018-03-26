const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const autoprefixer = require('autoprefixer');

const postcssOpts = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      browsers: [
        '>1%',
        'Android > 4',
        'iOS > 7',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
  ],
};

const config = merge(baseConfig, {
  mode: 'development',

  output: {
    path: path.resolve(__dirname, '../.dev'),
    filename: 'js/[name].js',
  },

  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: postcssOpts,
          },
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: postcssOpts,
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: postcssOpts,
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
});

module.exports = config;
