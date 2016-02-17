module.exports            = {};

// Navigation
module.exports.on         = require('./dist/builder').on;
module.exports.visit      = require('./dist/builder').visit;

// Browser
module.exports.setInstance = require('./dist/browser').setInstance;
module.exports.getInstance = require('./dist/browser').getInstance;

// Elements
module.exports.Button     = require('./dist/elements/Button');
module.exports.Span       = require('./dist/elements/Span');
