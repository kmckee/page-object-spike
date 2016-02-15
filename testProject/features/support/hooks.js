
var getBrowser = require('page-object-js').getBrowser;
module.exports = function() {
    this.AfterFeatures(function(scenario, done) {
        getBrowser().quit();
        done();
    });
};
