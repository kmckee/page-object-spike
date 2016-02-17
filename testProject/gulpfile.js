/*eslint-disable no-console */

var path        = require('path'),
gulp        = require('gulp'),
q           = require('q'),
gulpHelpers = require('./gulpHelpers/gulpHelpers'),
cucumber    = require('gulp-cucumber');

////////////////////////////////////////////////////////////////////////////////
// cukes
////////////////////////////////////////////////////////////////////////////////
gulp.task('cukes', [], function () {   // TODO: Lint prior to cukes.
    'use strict';
    return runCukes();
});

gulp.task('cukes:focus', [], function () {   // TODO: Lint prior to cukes.
    'use strict';
    return runCukes({'tags': '@focus'});
});


////////////////////////////////////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////////////////////////////////////

// Returns a promise that runs the cukes.
function runCukes(options) {
    'use strict';
    options = options || {};
    var defaultOptions = {
        'steps':   'features/step-definitions/**/*.js',
        'support': 'features/support/**/*.js',
        'format':  'pretty'
    };
    Object.assign(options, defaultOptions);

    return startServer(path.join(__dirname, 'src'))
                .then(function (destroyServerFunc) {
                        var cukeStream = gulp.src('features/*')
                                             .pipe(cucumber(options));
                        return gulpHelpers.streamToPromise(cukeStream)
                                          .then(destroyServerFunc);
                    }
                );
}

// Starts a static file server for the specified directory on the specified port.
// Returns a promise for a function that should be called (with no arguments) when the
// server should be destroyed.
//
function startServer(directory, port) {
    'use strict';

    var staticSrv     = require('node-static'),
    enableDestroy = require('server-destroy'),
    fileServer    = new staticSrv.Server(directory),
    dfd           = q.defer(),
    server;

    // If not provided, use a default port of 3000.
    port = port || 3000;

    server = require('http').createServer(
        function (request, response) {
            request
            .addListener(
                'end',
                function () {
                    fileServer.serve(request, response);
                }
            )
            .resume();
        }
    );

    server.listen(
        port,
        function (err) {
            if (err) {
                console.log('Error starting server:', err);
                dfd.reject(err);
                return;
            }

            console.log('Server running on port:', port);
            enableDestroy(server);
            dfd.resolve(function () {
                console.log('Shutting down server.');
                server.destroy();
            });
        }
    );

    return dfd.promise;
}
