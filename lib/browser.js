var theBrowser;

module.exports = {};
module.exports.setBrowser = function(browser) {
    'use strict';
    theBrowser = browser;
};

module.exports.getBrowser = function() {
    'use strict';
    return theBrowser;
};
