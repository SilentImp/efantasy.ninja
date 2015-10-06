var gulp = require('gulp')
    , sourcemaps = require('gulp-sourcemaps')
    , jade = require('gulp-jade')
    , babel = require('gulp-babel')
    , imagemin = require('gulp-imagemin')
    , plumber = require('gulp-plumber')
    , pngquant = require('imagemin-pngquant')
    , order = require("gulp-order")
    , postcss = require('gulp-postcss')
    , nested = require('postcss-nested')
    , color = require('postcss-color-function')
    , vars = require('postcss-simple-vars')
    , mixin = require('postcss-mixins')
    , imprt = require('postcss-import')
    , autoprefixer = require('autoprefixer-core')
    , concat = require('gulp-concat')
    , find = require('find')
    , path = require('path')
    , gulpif = require('gulp-if')
    , svg2png = require('gulp-svg2png')
    , build = require('gulp-gh-pages')
    , uglify = require('gulp-uglify')
    , dirs = {
      'source': {
        'jade': ['./source/elements/**/*.jade','./source/pages/*.jade','./source/partials/*.jade']
        , 'page': './source/pages/*.jade'
        , 'list': './source/list/index.jade'
        , 'copy': './source/copy/**/*'
        , 'js': ['./source/elements/**/*.js', './source/js/*.js']
        , 'css': ['./source/elements/**/*.css', './source/css/*.css']
        , 'svg': './source/images/*.svg'
        , 'images': './source/images/*'
        , 'fonts': './source/fonts/*'
      }
      , 'build': {
        'html': './build/'
        , 'fonts': './build/fonts/'
        , 'js': './build/js/'
        , 'css': './build/css/'
        , 'images': './build/images/'
      }
    };

gulp.task('list', function () {
  find.file(/\.html$/, dirs.build.html, function (files){
    var names = []
        , file;
    for(var i=0; i<files.length; i++){
      file = files[i];
      if(file.indexOf('index.html')>-1 || (file.match(/\//g) || []).length>1){
        continue;
      }
      console.log(path.basename(file));
      names.push(path.basename(file))
    }
    gulp.src(dirs.source.list)
      .pipe(plumber())
      .pipe(jade({
        pretty: true
        , locals: {'pages': names}
        }))
      .pipe(gulp.dest(dirs.build.html));
  });
});

gulp.task('copy', function () {
  gulp.src(dirs.source.copy).pipe(gulp.dest(dirs.build.html));
});

gulp.task('fonts', function () {
  gulp.src(dirs.source.fonts).pipe(gulp.dest(dirs.build.fonts));
});

gulp.task('images', ['svg'], function () {
  return gulp.src(dirs.source.images)
    .pipe(plumber())
    .pipe(gulpif(/[.](svg)$/, svg2png()))
    .pipe(gulpif(/[.](png|jpeg|jpg|svg)$/, imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        optimizationLevel: 1,
        use: [pngquant()]
      })
    ))
    .pipe(gulp.dest(dirs.build.images));
});

gulp.task('svg', function () {
  gulp.src(dirs.source.svg).pipe(gulp.dest(dirs.build.images));
});

gulp.task('html', function() {
  return gulp.src(dirs.source.page)
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(dirs.build.html));
});

gulp.task('js', function() {
  return gulp.src(dirs.source.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("scripts.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.build.js));
});

gulp.task('css', function() {
  var processors = [
    imprt({
      from: process.cwd()+'/source/elements/layout/layout.css'
      , glob: true
      })
    , mixin
    , vars
    , nested
    , color
    , autoprefixer({
        browsers: ['last 2 version', 'IE 8', 'IE 9', 'IE 10', 'IE 11', 'Opera 12']
        })
    ];

  return gulp.src(dirs.source.css)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(order(['reset.css', 'fonts.css']))
    .pipe(postcss(processors))
    .pipe(concat("styles.css"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dirs.build.css));
});

gulp.task('build', function () {
  console.log('deploying');
  return gulp.src('build/**')
    .pipe(plumber())
    .pipe(build({
      branch:     'gh-pages',
      cacheDir:   'gh-cache',
      remoteUrl:  'git@github.com:SilentImp/efantasy.ninja.git'
    }).on('error', function(){
      console.log('error', arguments);
    }));
});

gulp.task('watch', function () {
  gulp.watch([dirs.source.css], ['css']);
  gulp.watch(dirs.source.jade, ['html']);
  gulp.watch(dirs.source.js, ['js']);
});

gulp.task('default', ['copy', 'fonts', 'html', 'css', 'js', 'images']);
