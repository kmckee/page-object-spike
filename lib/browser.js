var theBrowser;

module.exports = {};
module.exports.setInstance = function(browser) {
    'use strict';
    theBrowser = browser;
};

module.exports.getInstance = function() {
    'use strict';
    return theBrowser;
};
