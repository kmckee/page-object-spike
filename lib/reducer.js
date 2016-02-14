module.exports = {
    reducePromises: function(promises) {
        return Promise.resolve();
        // return promises.reduce(function(previous, current) {
        //     return previous.then(function() {
        //         return current;
        //     });
        // }, Promise.resolve()).then(then);
    }
}
