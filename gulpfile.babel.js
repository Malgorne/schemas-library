import gulp from 'gulp';
import requireDir from 'require-dir';

requireDir('./tasks');

// Build task will cleanup the project, after compiles js files, then generates the docs
gulp.task('build', ['babel', 'doc']);

gulp.task('default', ['build']);
