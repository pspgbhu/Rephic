const path = require('path');
const chalk = require('chalk');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const rootPath = path.resolve(__dirname, '../');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
console.log(chalk.yellow('Webpack mode:', process.env.NODE_ENV));

const config = {
  mode: process.env.NODE_ENV,

  entry: {
    app: path.resolve(rootPath, 'client/index.jsx'),
  },

  output: {
    path: path.resolve(rootPath, 'public'),
    filename: 'js/app.js',
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', 'less', 'css'],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader',
      },
      {
        test: /\.(js|jsx|mjs)$/,
        include: path.resolve(rootPath, 'client'),
        loader: require.resolve('babel-loader'),
        options: {

          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract({
          fallback: {
            loader: require.resolve('style-loader'),
            options: {
              hmr: false,
            },
          },
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: process.env.NODE_ENV === 'production',
              },
            },
            {
              loader: 'less-loader',
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
          ],
        }),
      },
    ],
  },

  plugins: [
    new UglifyJSPlugin(),

    new ExtractTextPlugin({
      filename: 'css/style.css',
    }),
  ],
};

module.exports = config;
