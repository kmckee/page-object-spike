const reducer = require('./reducer');

module.exports = {
    on: function(PageConstructor) {
        var builder = new PageConstructor();
        decorateWithBuilderFunctionality(builder);
        return builder;
    }
};

function decorateWithBuilderFunctionality(builder) {
    'use strict';
    const promiseFactories = [];
    for(let subjectKey in builder) {
        let subject = builder[subjectKey];
        for(let actionKey in subject) {
            let originalAction = subject[actionKey];
            subject[actionKey] = function(/* arguments */) {
                let actionPromiseFactory = function() { return originalAction.apply(this, arguments); };
                promiseFactories.unshift(actionPromiseFactory);
                return builder;
            };
        }
    }

    builder.then = function(then) {
        const promiseTree = reducer.reducePromises(promiseFactories);
        return promiseTree.then(then).catch(function(err) {
            // Exceptions need to be rethrown from a stabile event loop,
            // so that the correct output is written to the console.
            setTimeout(function() {
                throw err;
            }, 0);
        });
    };
}
