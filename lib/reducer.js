module.exports = {
    reducePromises: function(promises) {
        var promiseTree = Promise.resolve();
        promiseTree = promiseTree.then(() => {
            const promise = promises[0]();
            return promise;
        });
        return promiseTree;
        // return promises.reduce(function(previous, current) {
        //     return previous.then(function() {
        //         return current;
        //     });
        // }, Promise.resolve()).then(then);
    }
}
