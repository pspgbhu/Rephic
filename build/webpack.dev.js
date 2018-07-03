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
    path: path.resolve(__dirname, '../node_modules/.cache/rephic/public'),
    filename: 'js/[name].js',
    publicPath: '/',
  },

  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
        use: [
          'style-loader',
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
        use: [
          'style-loader',
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

  plugins: [
  ],
});

module.exports = config;
