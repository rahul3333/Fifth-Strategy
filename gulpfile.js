const gulp = require('gulp');

const csso = require('gulp-csso');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');
const path=require('path');

const manifestCWD = path.join(__dirname, "public", "assets");
const manifestPath = path.join(manifestCWD, "rev-manifest.json");

gulp.task('css',function(){
 console.log('minifying css...');

    return gulp.src('./assets/**/*.css')
     .pipe(csso())
     .pipe(rev())
     .pipe(gulp.dest('./public/assets'))
     .pipe(rev.manifest(manifestPath, {
        cwd: manifestCWD,
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});


gulp.task('js',function(){
    console.log('minifying js...');
    return gulp.src('./assets/**/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest(manifestPath, {
            cwd: manifestCWD,
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
});


gulp.task('images',function(){
    console.log('compressing images...');
    return  gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest(manifestPath, {
        cwd: manifestCWD,
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('files',function(){
    console.log('Files');
    return gulp.src('./assets/**/*.csv')
    .pipe(gulp.dest('./public/assets'))
})

// empty the public/assets directory
gulp.task('clean:assets', function(done){
     del.sync('./public/assets');
     done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'images','js','files'), function(done){
    console.log('Building assets');
    done();
});