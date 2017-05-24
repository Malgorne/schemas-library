export default {
  js: ['./src/**/*.js', '!dist/**', '!node_modules/**', '!coverage/**', '!doc/**',
    '!gulpfile.babel.js'],
  cleanProject: ['dist/**', 'coverage/**', 'doc/**'],
  coverageJs: ['./src/**/*.js', '!node_modules/**', '!coverage/**'],
  coverageIgnore: ['!src/config/**', '!src/common/**'],
  tests: './tests/*.test.js',
  doc: ['README.md', './src/**/*.js']
};
