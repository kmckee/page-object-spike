const   reducer = require('./reducer'),
        browser = require('./browser');

module.exports = {
    on: function(PageConstructor) {
        'use strict';
        let builder = new PageConstructor();
        decorateWithBuilderFunctionality(builder);
        return builder;
    },
    visit: function(PageConstructor) {
        'use strict';
        let builder = new PageConstructor();
        decorateWithBuilderFunctionality(builder);
        return browser.getInstance().get(builder.url);
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
            // so that the correct output is written to the console
            // when tests fail.
            setTimeout(function() {
                throw err;
            }, 0);
        });
    };
}
