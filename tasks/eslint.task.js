import gulp from 'gulp';
import eslint from 'gulp-eslint';

import { js } from './paths';

gulp.task('lint', () => gulp.src(js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()
  ));
