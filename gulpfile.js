const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));

gulp.task('server', function() {
    browsersync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browsersync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browsersync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browsersync.stream());
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browsersync.stream());
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"))
        .pipe(browsersync.stream());
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
        .pipe(browsersync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'html', 'images'));
