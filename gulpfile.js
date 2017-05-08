const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require("gulp-tslint");
const runSequence = require('run-sequence');
const spawn = require('child_process').spawn;
const del = require('del');

const tsProject = ts.createProject('tsconfig.json');

let server;

gulp.task('tslint', () =>
  gulp.src('./src/**/*.ts')
  .pipe(tslint({
      formatter: "prose"
  }))
  .pipe(tslint.report({
      emitError: false,
      summarizeFailureOutput: true
  }))
);

function error(error, blame) {
  console.log(blame);
  console.log(error);
}

gulp.task('scripts', ['tslint'], () => {
    const tsResult = tsProject.src()
            .pipe(sourcemaps.init())
            .pipe(tsProject());

    return tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('build'));
});

gulp.task('serve', ['scripts'], () => {
  if(server) {
    server.kill();
  }
  server = spawn('node', ['build/server.js'], { stdio: 'inherit' });
});

gulp.task('clean', () => {
  return del([ 'build/**/*' ]);
});

gulp.task('start', (done) => {
  runSequence('clean', 'serve', done);
});

gulp.task('watch', ['start'], () => {
  gulp.watch('src/**/*.ts', ['serve']);
});
