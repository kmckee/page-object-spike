var getBrowser  = require('../browser').getInstance,
    by          = require('selenium-webdriver').By;

module.exports = function(locator) {
    this.visible = function() {
        return getBrowser().isElementPresent(by.id(locator.id));
    };

    this.isEnabled = function() {
        return getBrowser().findElement(by.id(locator.id)).isEnabled();
    };

    return this;
};
