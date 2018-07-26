const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = merge(baseConfig, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../server/public'),
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

// function extracter(loader) {
  // const cfg = {
    // fallback: {
      // loader: 'style-loader',
      // options: {
        // hmr: false,
      // },
    // },
    // use: [
      // {
        // loader: require.resolve('css-loader'),
        // options: { importLoaders: 1, minimize: true },
      // },
      // {
        // loader: require.resolve('postcss-loader'),
        // options: {
          // ident: 'postcss',
          // plugins: () => [
            // require('postcss-flexbugs-fixes'),
            // autoprefixer({
              // browsers: [
                // '>1%',
                // 'Android > 4',
                // 'iOS > 7',
                // 'last 4 versions',
                // 'Firefox ESR',
                // 'not ie < 9', // React doesn't support IE8 anyway
              // ],
              // flexbox: 'no-2009',
            // }),
          // ],
        // },
      // },
    // ],
  // };

  // if (loader) {
    // cfg.use.push(loader);
  // }

  // return cfg;
// }


module.exports = config;
