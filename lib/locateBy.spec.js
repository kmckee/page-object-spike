const   locateBy = require('./locateBy'),
        selenium = require('selenium-webdriver');

describe('builder', function() {
    'use strict';
    it('works with simple id locator', function() {
        sinon.spy(selenium.By, 'id');
        locateBy({id: 'foo'});
        expect(selenium.By.id).to.have.been.calledWith('foo');
        // Would it be better to inspect result rather than assert on calls to mock?
    });
});
