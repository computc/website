var gulp = require("gulp")

var sass = require("gulp-sass")
var mincss = require("gulp-minify-css")
var neat = require("node-neat")

gulp.task("styles", function()
{
	gulp.src("./resources/development/scss/*.scss")
		.pipe(sass({includePaths: ["./resources/development/ttf"]}))
		.pipe(mincss({keepBreaks: true}))
		.pipe(gulp.dest("./resources/distribution/css"))
});

gulp.task("default", function()
{
	gulp.watch("./resources/development/scss/*.scss", ["styles"])
});