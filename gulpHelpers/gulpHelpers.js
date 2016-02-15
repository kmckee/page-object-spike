// var q = require('q');
//
// module.exports = {};
//
// module.exports.streamToPromise = function streamToPromise(stream) {
//     'use strict';
//
//     var dfd = q.defer();
//
//     stream.once('error', function (err) {
//         dfd.reject(err);
//     });
//
//     stream.once('end', function () {
//         dfd.resolve();
//     });
//
//     return dfd.promise;
// };
