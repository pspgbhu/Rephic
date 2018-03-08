const path = require('path');

const rootPath = path.resolve(__dirname, '../');

const config = {
  entry: {
    app: path.resolve(rootPath, 'client/index.jsx'),
  },

  output: {
    path: path.resolve(rootPath, 'public'),
    filename: 'js/app.js',
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', 'less', 'css'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        // include: path.resolve(rootPath, 'client'),
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
  ],
};

module.exports = config;
