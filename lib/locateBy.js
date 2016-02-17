const by = require('selenium-webdriver').By;

module.exports = function(locator) {
    return by.id(locator.id);
    // TODO: Make this support lots of other stuff.
};
