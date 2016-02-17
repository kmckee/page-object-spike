var getBrowser  = require('../browser').getInstance,
    locateBy    = require('../locateBy');

module.exports = function(locator) {
    this.text = function() {
        return getBrowser().findElement(locateBy(locator)).getText();
    };

    return this;
};
