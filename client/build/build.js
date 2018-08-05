const webpack = require('webpack');
const chalk = require('chalk');
const webpackProdConfig = require('./webpack.prod');

console.log(chalk.yellow('Webpack mode:', webpackProdConfig.mode));

const compiler = webpack(webpackProdConfig);
compiler.run((err, stats) => {
  if (err) throw err;

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  }) + '\n');
});
