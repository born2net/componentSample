gulp-headerfooter [![Build Status](https://travis-ci.org/garrows/gulp-headerfooter.svg?branch=master)](https://travis-ci.org/garrows/gulp-headerfooter) [![NPM version](https://badge.fury.io/js/gulp-headerfooter.png)](http://badge.fury.io/js/gulp-headerfooter)
=================

A gulp plugin for adding headers and footers to your files


Install
-------

Install with [npm](https://npmjs.org/package/gulp-headerfooter).

```
npm install --save-dev gulp-headerfooter
```

Examples
--------

Filenames as the header & footer

```js
var gulp = require('gulp');
var headerfooter = require('gulp-headerfooter');

gulp.task('default', function () {
	gulp.src('./app/content')
		.pipe(headerfooter.header('./app/partials/header.html'))
		.pipe(headerfooter.footer('./app/partials/footer.html'))
        .pipe(gulp.dest('./public/'));
});
```

Strings as the header & footer

```js
var gulp = require('gulp');
var headerfooter = require('gulp-headerfooter');

gulp.task('default', function () {
    gulp.src('./app/content')
        .pipe(headerfooter.header('<html><body>'))
        .pipe(headerfooter.footer('</body></html>'))
        .pipe(gulp.dest('./public/'));
});
```

Buffers as the header & footer

```js
var gulp = require('gulp');
var headerfooter = require('gulp-headerfooter');
var fs = require('fs');

var header = fs.readFileSync('./app/partials/header.html');
var footer = fs.readFileSync('./app/partials/footer.html');

gulp.task('default', function () {
    gulp.src('./app/content')
        .pipe(headerfooter.header(header))
        .pipe(headerfooter.footer(footer))
        .pipe(gulp.dest('./public/'));
});
```

Short hand version

```js
var gulp = require('gulp');
var headerfooter = require('gulp-headerfooter');

gulp.task('default', function () {
    gulp.src('./app/content')
        .pipe(headerfooter('<html><body>', '</body></html>')
        .pipe(gulp.dest('./public/'));
});
```

Testing
-------
Run the units tests with
```bash
npm test
```
