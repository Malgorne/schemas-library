import gulp from 'gulp';
import babel from 'gulp-babel';

import { js } from './paths';

gulp.task('babel', ['clean'], () => gulp.src(js)
  .pipe(babel())
  .pipe(gulp.dest('dist')
));
