"use strict";

var gulp = require("gulp"),
	browserSync = require("browser-sync"),
	sass = require("gulp-sass"),
	bourbon = require("node-bourbon").includePaths,
	neat = require("node-neat").includePaths,
	htmlmin = require('gulp-htmlmin'),
	autoprefixer = require('gulp-autoprefixer');

// Compiles all gulp tasks
gulp.task("default", ["sass", "minify"]);

// Live reload anytime a file changes
gulp.task("watch", ["browserSync", "minify", "sass" ], function() {
	gulp.watch("src/scss/**/*.scss", ["sass"]);
	gulp.watch("src/*.html", ["minify"]);
});

// Spin up a server
gulp.task("browserSync", function() {
	browserSync({
		server: {
			baseDir: "dist"
		}
	})
});

// Compile SASS files
gulp.task("sass", function() {
	gulp.src("src/scss/**/*.scss")
		.pipe(sass({
			includePaths: bourbon,
			includePaths: neat
		}))
		.pipe(gulp.dest("dist/css"))
		.pipe(autoprefixer({
            browsers: ['last 2 version',
	        'safari 5', 'ie 8',
	        'ie 9',
	        'opera 12',
	        'ios 6',
	        'android 4']
        }))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// Minify HTML
gulp.task('minify', function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true,minifyJS: true}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}))
});