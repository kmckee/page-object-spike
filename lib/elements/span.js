var getBrowser  = require('../browser').getInstance,
    by          = require('selenium-webdriver').By;

module.exports = function(locator) {
    this.text = function() {
        return getBrowser().findElement(by.id(locator.id)).getText();
    };

    return this;
};
