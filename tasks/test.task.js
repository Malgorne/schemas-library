import gulp from 'gulp';
import istanbul from 'gulp-babel-istanbul';
import babel from 'gulp-babel';
import injectModules from 'gulp-inject-modules';
import mocha from 'gulp-mocha';
import processEnv from 'gulp-process-env';

import { coverageJs, coverageIgnore, tests } from './paths';

gulp.task('prepare-test', () => gulp.src(coverageJs.concat(coverageIgnore))
  .pipe(istanbul())
  .pipe(istanbul.hookRequire()
));

gulp.task('test', ['prepare-test'], () => gulp.src(tests)
  .pipe(processEnv({ NODE_ENV: 'test' }))
  .pipe(babel())
  .pipe(injectModules())
  .pipe(mocha({ timeout: 5000 }))
  .pipe(istanbul.writeReports())
  .pipe(istanbul.enforceThresholds({ thresholds: { global: 95 } }))
  .once('end', () => process.exit()
));
