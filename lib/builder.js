const _       = require('lodash'),
      reducer = require('./reducer');
      
module.exports = {
    on: function(PageConstructor) {
        var builder = new PageConstructor();
        decorateWithBuilderFunctionality(builder);
        return builder;
    }
}

function decorateWithBuilderFunctionality(builder) {
    "use strict";
    const promises = [];

    for(let subjectKey in builder) {
        let subject = builder[subjectKey];
        for(let actionKey in subject) {
            let originalAction = subject[actionKey];
            subject[actionKey] = function(/* arguments */) {
                let actionPromise = originalAction.apply(this, arguments);
                promises.unshift(actionPromise);
                return builder;
            };
        }
    }

    builder.then = function(then) {
        const promiseTree = reducer.reducePromises(promises);
        return promiseTree.then(then);
    };
}
