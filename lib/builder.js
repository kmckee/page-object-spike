const _ = require('lodash');

module.exports = {
    on: function(PageConstructor) {
        var builder = new PageConstructor();
        decorateWithBuilderFunctionality(builder);
        return builder;
    }
}

// Look into _.wrap and _.keys, there's probably a cute way to do it.
function decorateWithBuilderFunctionality(builder) {
    const promises = [];

    for(subjectKey in builder) {
        const subject = builder[subjectKey];
        for(actionKey in subject) {
            const originalAction = subject[actionKey];
            subject[actionKey] = function(/* arguments */) {
                var actionPromise = originalAction.apply(this, arguments);
                promises.shift(actionPromise);
                return builder;
            };
        }
    }

    builder.then = function() {
        return promises.reduce(function(previous, current) {
            return previous.then(function() {
                return current;
            });
        }, new Promise());
    };
}
