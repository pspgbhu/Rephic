const Webpack = require('webpack');
const koaWebpack = require('koa-webpack');
const config = require('../../build/webpack.dev');

const compiler = Webpack(config);

module.exports = (app) => {
  app.use(koaWebpack({
    compiler,
    hot: false,
  }));
};
