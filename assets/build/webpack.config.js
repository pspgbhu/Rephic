const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, '../src/index.js'),

  output: {
    path: path.resolve(__dirname, '../../public'),
    filename: 'app.js',
  },

  resolve: {
    extensions: ['js', 'jsx'],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader',
      },
      {
        test: /\.(jsx|js)$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: require.resolve('babel-loader'),
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
    ],
  },

  plugins: [
    new UglifyJSPlugin(),
  ],
};

module.exports = config;
