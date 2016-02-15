module.exports = {
    reducePromises: function(promises) {
        var promiseTree = Promise.resolve();
        promises.forEach((item) => {
            promiseTree = promiseTree.then(() => {
                const promise = item();
                return promise;
            });
        });
        return promiseTree;
        // return promises.reduce(function(previous, current) {
        //     return previous.then(function() {
        //         return current;
        //     });
        // }, Promise.resolve()).then(then);
    }
}
