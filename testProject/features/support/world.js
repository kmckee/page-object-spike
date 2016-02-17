var wd = require('selenium-webdriver'),
    setInstance = require('page-object-js').setInstance;

var driver = new wd.Builder()
                     .forBrowser('chrome')
                     .build();

setInstance(driver);

module.exports = function() {
    this.World.prototype.browser = driver;
};
