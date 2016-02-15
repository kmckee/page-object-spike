/*eslint-disable no-console */

var gulp     = require('gulp'),
    path     = require('path'),
    chalk    = require('chalk'),
    fs       = require('node-fs-extra'),
    mocha    = require('gulp-mocha'),
    q        = require('q');

////////////////////////////////////////////////////////////////////////////////
// default
////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['usage'], function () {
});


////////////////////////////////////////////////////////////////////////////////
// usage
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    'usage',
    function () {
        'use strict';

        var lines = [
            chalk.green('gulp [usage]'),
            '    Show this usage information',
            '',
            chalk.green('gulp clean'),
            '    Delete all generated files.  You must run "npm run setup"',
            '    to setup the project once again.',
            '',
            chalk.green('gulp ut'),
            '    Build and run the unit tests',
            '',
            chalk.green('gulp buildRelease'),
            '    Builds a release.',
            ''
            // chalk.green('gulp cukes'),
            // '    Starts the sample server and runs the cukes.',
            // ''
        ];

        console.log(lines.join('\n'));
    }
);

////////////////////////////////////////////////////////////////////////////////
// clean
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    'clean',
    function (cb) {
        'use strict';

        var del = require('del'),
        dirsToDelete = [
            'dist',
            'node_modules'
        ];

        del(dirsToDelete, cb);
    }
);


////////////////////////////////////////////////////////////////////////////////
// eslint
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    'lint', function () {
        'use strict';

        var eslint = require('gulp-eslint'),
        jsSources = getJavaScriptSourceGlobs({includeSpecs: true});

        return gulp.src(jsSources)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    }
);


////////////////////////////////////////////////////////////////////////////////
// buildRelease
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    'buildRelease',
    ['lint', 'ut' /*, 'cukes' */],
    function () {
        'use strict';

        var outputDir = path.join(__dirname, 'dist'),
        sources = getJavaScriptSourceGlobs({includeSpecs: false});

        fs.removeSync(outputDir);

        return gulp.src(sources)
        .pipe(gulp.dest(outputDir));
    }
);

gulp.task(
    'cukeRelease',
    ['buildRelease'],
    function () {
        'use strict';

        //
        // Copy dist folders into testProject as if they were installed
        // using npm.
        //
        fs.removeSync('testProject/node_modules/page-object-js');
        fs.copySync('dist', 'testProject/node_modules/page-object-js/dist');
        fs.copySync('package.json',
        'testProject/node_modules/page-object-js/package.json');
        fs.copySync('index.js',
        'testProject/node_modules/page-object-js/index.js');
    }
);


////////////////////////////////////////////////////////////////////////////////
// ut
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    'ut',
    ['lint'],
    function () {
        'use strict';
        return gulp.src('lib/**/*.spec.js')
        .pipe(mocha({reporter: 'nyan'}));
    }
);

////////////////////////////////////////////////////////////////////////////////
// cukes
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    'cukes',
    ['cukeRelease'],
    function () {
        'use strict';
        return exec(
            'gulp cukes:focus',
            {cwd: path.join(__dirname, 'testProject')}
        );
    }
);

gulp.task(
    'cukes:focus',
    ['cukeRelease'],
    function () {
        'use strict';
        return exec(
            'gulp cukes:focus',
            {cwd: path.join(__dirname, 'testProject')}
        );
    }
);




////////////////////////////////////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////////////////////////////////////

function getJavaScriptSourceGlobs(config) {
    'use strict';

    var sources = ['lib/**/*.js'];

    if (!config.includeSpecs) {
        sources.push('!lib/**/*.spec.js');
    }

    return sources;
}

// Just like Node's child_process.exec(), but returns a promise.  The promise is is
// fulfilled (with stdout) when the process exits successfully.  The promise is reject
// with an Error object otherwise.
function exec(command, options) {
    'use strict';

    var nodeExec = require('child_process').exec,
    dfd = q.defer();
    nodeExec(command, options, function (err, stdout, stderr) {
        if (err) {
            console.log(stderr);
            dfd.reject(err);
            return;
        }

        console.log(stdout);
        dfd.resolve(stdout);
    });
    return dfd.promise;
}
