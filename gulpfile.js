const { src, dest, watch, series, parallel } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const less = require('gulp-less');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const gulppug = require('gulp-pug');
const formatHtml = require('gulp-format-html');
const newer = require('gulp-newer');
const browsersync = require('browser-sync').create();

const del = require('del');

// paths
const path = {
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    },
    pug: {
        src: 'src/pug/**/*.pug',
        dest: 'dist/'
    },
    styles: {
        src: ['src/styles/**/*.sass', 'src/styles/**/*.scss', 'src/styles/**/*.less', 'src/styles/**/*.styl'],
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/img/**',
        dest: 'dist/img/'
    },
    fonts: {
        src: 'src/font/**',
        dest: 'dist/font/'
    }
}

// clean task
function clean() {
    return del(['dist/*', '!dist/img']);
}

// html
function html() {
    return src(path.html.src)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(size())
        .pipe(dest(path.html.dest))
        .pipe(browsersync.stream());
}

// pug
function pug() {
    return src(path.pug.src)
        .pipe(gulppug())
        .pipe(size())
        .pipe(formatHtml({
            indent_size: 4
        }))
        .pipe(dest(path.pug.dest))
        .pipe(browsersync.stream());
}

// styles task
function styles() {
    return src(path.styles.src)
        .pipe(sourcemaps.init())
        // .pipe(less())
        // .pipe(stylus())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false,
            overrideBrowserslist: ['last 4 version'],
            grid: true
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(size())
        .pipe(dest(path.styles.dest))
        .pipe(browsersync.stream());
}

// scripts task
function scripts() {
    return src(path.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(size())
        .pipe(dest(path.scripts.dest))
        .pipe(browsersync.stream());
}

function img() {
    return src(path.images.src)
        .pipe(newer(path.images.dest))
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(size())
        .pipe(dest(path.images.dest));
}

// Обработка шрифтов
function font() {
    return src(path.fonts.src)
        .pipe(dest(path.fonts.dest));
}

// watcher task
function watcher() {
    browsersync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch(path.html.dest).on('change', browsersync.reload);
    watch(path.html.src, html);
    watch(path.pug.src, pug);
    watch(path.styles.src, styles);
    watch(path.scripts.src, scripts);
    watch(path.images.src, img);
}

const build = series(clean, font, pug, parallel(styles, scripts, img), watcher);

exports.clean = clean;
exports.font = font;
exports.img = img;
exports.html = html;
exports.pug = pug;
exports.styles = styles;
exports.scripts = scripts;
exports.watcher = watcher;
exports.build = build;
exports.default = build;