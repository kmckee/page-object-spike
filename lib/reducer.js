module.exports = {
    reducePromises: function(promises) {
        return promises.reduce((prev, cur) => {
            return prev.then(cur);
        }, Promise.resolve());
    }
};
