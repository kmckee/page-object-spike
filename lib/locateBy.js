const by = require('selenium-webdriver').By;

// TODO: Make this support lots of other selectors.
module.exports = function(locator) {
    return by.id(locator.id);
};
