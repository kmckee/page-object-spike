
var getInstance = require('page-object-js').getInstance;
module.exports = function() {
    this.AfterFeatures(function(scenario, done) {
        getInstance().quit();
        done();
    });
};
