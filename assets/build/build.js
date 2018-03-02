const webpack = require('webpack');
const config = require('../webpack.config');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const compiler = webpack(config);

function run() {
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
}

run();

module.exports = run;
