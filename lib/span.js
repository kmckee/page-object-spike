var getBrowser  = require('./browser').getBrowser,
    by          = require('selenium-webdriver').By;

module.exports = function(locator) {
    this.text = function() {
        return function() { return getBrowser().findElement(by.id(locator.id)).getText(); };
    };
    return this;
};
