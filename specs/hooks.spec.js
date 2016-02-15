const chai  = require('chai');
chai.use(require('sinon-chai'));
GLOBAL.expect  = chai.expect;

beforeEach(function() {
    GLOBAL.sinon = require('sinon').sandbox.create();
});

afterEach(function() {
    GLOBAL.sinon.restore();
});
