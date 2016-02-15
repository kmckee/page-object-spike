var wd = require('selenium-webdriver'),
    setBrowser = require('page-object-js').setBrowser;

var driver = new wd.Builder()
                     .forBrowser('chrome')
                     .build();

setBrowser(driver);

module.exports = function() {
    this.World.prototype.browser = driver;
};
