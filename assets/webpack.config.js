const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  // mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: {
    app: path.resolve(__dirname, 'src/index.jsx'),
  },

  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'js/[name].js',
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
        include: path.resolve(__dirname, 'src'),
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
              // loader: require.resolve('less-loader'),
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
      filename: '../public/css/[name].css',
    }),
  ],
};

module.exports = config;
