const gulp = require('gulp');
const webpack = require('webpack');
const notifier = require('node-notifier');
const opn = require('opn');
const chalk = require('chalk');

const webpackDevConfig = require('./client/build/webpack.dev');

gulp.task('default', ['watch']);

gulp.task('watch', () => {
  process.env.NODE_ENV = 'development';
  const compiler = webpack(webpackDevConfig);

  console.log(chalk.yellow('Webpack mode:', webpackDevConfig.mode));
  console.log(chalk.yellow('Webpack is building...'));

  let first = true;

  const watching = compiler.watch({
    ignored: /node_modules/,
  }, (err, stats) => {
    webpackOutputHandler(err, stats);

    if (first) {
      opn('http://localhost:3000');
      first = false;
    }
  });
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
