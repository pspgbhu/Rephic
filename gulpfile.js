const gulp = require('gulp');
const webpack = require('webpack');
const notifier = require('node-notifier');
const opn = require('opn');
const chalk = require('chalk');

const webpackDevConfig = require('./build/webpack.dev');
const webpackProdConfig = require('./build/webpack.prod');

gulp.task('default', ['watch']);

gulp.task('watch', () => {
  const compiler = webpack(webpackDevConfig);
  console.log(chalk.yellow('Webpack mode:', webpackDevConfig.mode));

  notifier.notify({
    title: 'Webpack Notification',
    message: 'Webpack is watching assets modify...',
  });

  console.log(chalk.yellow('building...'));

  let first = true;
  const watching = compiler.watch({
    ignored: /node_modules/,
  }, (err, stats) => {
    webpackOutputHandler(err, stats);
    if (!first) return;

    first = false;
    opn('http://localhost:3000');
    compiler.run(webpackOutputHandler);
  });
});


gulp.task('build', () => {
  const compiler = webpack(webpackProdConfig);
  console.log(chalk.yellow('Webpack mode:', webpackProdConfig.mode));
  compiler.run(webpackOutputHandler);
});


function webpackOutputHandler(err, stats) {
  if (err) throw err;

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  }) + '\n');

  // notifier.notify({
  //   title: 'Notification',
  //   message: 'Webpack has built assets.',
  // });
}
