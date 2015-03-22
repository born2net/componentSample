var through = require('through2');
var fs = require('fs');

module.exports = function(header, footer) {
    // return through.obj(headerfooter);
    return through.obj(function(file, encoding, next) {
        headerfooter(file, header, footer, encoding, next);
    });
};

module.exports.header = function(header) {
    return through.obj(function(file, encoding, next) {
        headerfooter(file, header, null, encoding, next);
    });
};

module.exports.footer = function(footer) {
    return through.obj(function(file, encoding, next) {
        headerfooter(file, null, footer, encoding, next);
    });
};




function headerfooter(file, header, footer, encoding, next) {

    var bothDone = function() {
        done(file, header, footer, next);
    }

    var callbackCount = 0;
    checkType(header, function(err, input) {
        if (err) { return next(err); }

        header = input;
        if (++callbackCount == 2) {
            bothDone();
        }
    });

    checkType(footer, function(err, input) {
        if (err) { return next(err); }

        footer = input;
        if (++callbackCount == 2) {
            bothDone();
        }
    });

}

function done(file, header, footer, next) {
    var contents = [];

    if (header)         { contents.push(header); }
    if (file.contents)  { contents.push(file.contents); }
    if (footer)    { contents.push(footer); }

    file.contents = Buffer.concat(
        contents
    );
    next(null, file);
}

function checkType(input, done) {
    if (input instanceof Buffer) {
        done(null, input);
    } else if (typeof input == "string") {
        //Could be path or full string
        fs.readFile(input, function(err, fileBuffer) {
            if (err) {
                //Probably doesn't exist so its a string.
                done(null, new Buffer(input));
            } else {
                input = fileBuffer;
                done(null, fileBuffer);
            }
        });
    } else if (input == null) {
        done(null, null);
    } else {
        done(new Error("Unknown type. Either buffer, filename or string accepted."));
    }
}
