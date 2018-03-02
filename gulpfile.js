const gulp = require('gulp');
const notify = require('gulp-notify');
const build = require('./assets/build/build');

gulp.task('default', ['watch']);

gulp.task('watch', () => {
  watch();
});

function watch() {
  notify({
    message: 'watching ./assets/src',
  });

  gulp.watch('./assets/src/*', () => {
    notify({
      message: 'webpack rebuild assets',
    });
    console.log('webpack rebuilding assets');
    build();
  });
}
