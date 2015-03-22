var assert = require("assert");
var gulp = require("gulp");
var rename = require("gulp-rename");
var fs = require("fs");

var headerfooter = require("../gulp-headerfooter");

var testFile = function(outputFilename, doneTest, value) {
    fs.readFile('./test/outputs/' + outputFilename, { encoding: 'utf8' }, function(err, contents) {
        if (err) throw err;

        if (!value) {
            value = 'head\nbody\nfoot\n';
        }
        assert.equal(contents, value);

        fs.unlink('./test/outputs/' + outputFilename, function(err) {
            if (err) throw err;
            doneTest();
        })
    });
}

describe('Files', function(){
    describe('Header and Footer', function(){

        it('should equal headbodyfoot', function(doneTest){

            var output = (Math.random()* Math.pow(10, 16)) + '.txt';
            gulp.src('./test/inputs/body.txt')
                .pipe(headerfooter.header('./test/inputs/head.txt'))
                .pipe(headerfooter.footer('./test/inputs/foot.txt'))
                .pipe(rename(output))
                .pipe(gulp.dest('./test/outputs/'))
                .on('end', function() { testFile(output, doneTest); });
        });
    });

    describe('Header', function(){

        it('should equal headbody', function(doneTest){

            var output = (Math.random()* Math.pow(10, 16)) + '.txt';
            gulp.src('./test/inputs/body.txt')
                .pipe(headerfooter.header('./test/inputs/head.txt'))
                .pipe(rename(output))
                .pipe(gulp.dest('./test/outputs/'))
                .on('end', function() { testFile(output, doneTest, 'head\nbody\n'); });
        });
    });

    describe('Footer', function(){

        it('should equal bodyfoot', function(doneTest){

            var output = (Math.random()* Math.pow(10, 16)) + '.txt';
            gulp.src('./test/inputs/body.txt')
                .pipe(headerfooter.footer('./test/inputs/foot.txt'))
                .pipe(rename(output))
                .pipe(gulp.dest('./test/outputs/'))
                .on('end', function() { testFile(output, doneTest, 'body\nfoot\n'); });
        });
    });
});

describe('Strings', function(){
    describe('Header and Footer', function(){

        it('should equal headbodyfoot', function(doneTest){

            var output = (Math.random()* Math.pow(10, 16)) + '.txt';
            gulp.src('./test/inputs/body.txt')
                .pipe(headerfooter.header('head\n'))
                .pipe(headerfooter.footer('foot\n'))
                .pipe(rename(output))
                .pipe(gulp.dest('./test/outputs/'))
                .on('end', function() { testFile(output, doneTest); });
        });

        describe('Header', function(){

            it('should equal headbody', function(doneTest){

                var output = (Math.random()* Math.pow(10, 16)) + '.txt';
                gulp.src('./test/inputs/body.txt')
                    .pipe(headerfooter.header('head\n'))
                    .pipe(rename(output))
                    .pipe(gulp.dest('./test/outputs/'))
                    .on('end', function() { testFile(output, doneTest, 'head\nbody\n'); });
            });
        });

        describe('Footer', function(){

            it('should equal bodyfoot', function(doneTest){

                var output = (Math.random()* Math.pow(10, 16)) + '.txt';
                gulp.src('./test/inputs/body.txt')
                    .pipe(headerfooter.footer('foot\n'))
                    .pipe(rename(output))
                    .pipe(gulp.dest('./test/outputs/'))
                    .on('end', function() { testFile(output, doneTest, 'body\nfoot\n'); });
            });
        });
    });
});

describe('Buffers', function(){

    var header = fs.readFileSync('./test/inputs/head.txt');
    var footer = fs.readFileSync('./test/inputs/foot.txt');

    describe('Input files are buffers', function(){

        it('should be an instance of buffer', function(){
            assert(header instanceof Buffer);
            assert(footer instanceof Buffer);
        });
    });

    describe('Header and Footer', function(){

        it('should equal headbodyfoot', function(doneTest){

            var output = (Math.random()* Math.pow(10, 16)) + '.txt';
            gulp.src('./test/inputs/body.txt')
                .pipe(headerfooter.header(header))
                .pipe(headerfooter.footer(footer))
                .pipe(rename(output))
                .pipe(gulp.dest('./test/outputs/'))
                .on('end', function() { testFile(output, doneTest); });
        });
    });

    describe('Header', function(){

        it('should equal headbody', function(doneTest){

            var output = (Math.random()* Math.pow(10, 16)) + '.txt';
            gulp.src('./test/inputs/body.txt')
                .pipe(headerfooter.header(header))
                .pipe(rename(output))
                .pipe(gulp.dest('./test/outputs/'))
                .on('end', function() { testFile(output, doneTest, 'head\nbody\n'); });
        });
    });

    describe('Footer', function(){

        it('should equal bodyfoot', function(doneTest){

            var output = (Math.random()* Math.pow(10, 16)) + '.txt';
            gulp.src('./test/inputs/body.txt')
                .pipe(headerfooter.footer(footer))
                .pipe(rename(output))
                .pipe(gulp.dest('./test/outputs/'))
                .on('end', function() { testFile(output, doneTest, 'body\nfoot\n'); });
        });
    });
});

describe('Shorthand', function(){
    describe('Strings', function(){

        it('should equal headbodyfoot', function(doneTest){

            var output = (Math.random()* Math.pow(10, 16)) + '.txt';
            gulp.src('./test/inputs/body.txt')
                .pipe(headerfooter('head\n', 'foot\n'))
                .pipe(rename(output))
                .pipe(gulp.dest('./test/outputs/'))
                .on('end', function() { testFile(output, doneTest); });
        });
    });

    describe('Files', function(){

        it('should equal headbodyfoot', function(doneTest){

            var output = (Math.random()* Math.pow(10, 16)) + '.txt';
            gulp.src('./test/inputs/body.txt')
                .pipe(headerfooter('./test/inputs/head.txt', './test/inputs/foot.txt'))
                .pipe(rename(output))
                .pipe(gulp.dest('./test/outputs/'))
                .on('end', function() { testFile(output, doneTest); });
        });
    });

    describe('Buffer', function(){

        it('should equal headbodyfoot', function(doneTest){

            var header = fs.readFileSync('./test/inputs/head.txt');
            var footer = fs.readFileSync('./test/inputs/foot.txt');

            var output = (Math.random()* Math.pow(10, 16)) + '.txt';
            gulp.src('./test/inputs/body.txt')
                .pipe(headerfooter(header, footer))
                .pipe(rename(output))
                .pipe(gulp.dest('./test/outputs/'))
                .on('end', function() { testFile(output, doneTest); });
        });
    });
});
