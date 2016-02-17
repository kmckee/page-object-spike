var expect         = require('chai').expect,
    SignupFormPage = require('../pages/ButtonTestPage'),
    po             = require('page-object-js'),
    visit          = po.visit,
    on             = po.on;

module.exports = function () {
    this.When(/^I am viewing the Button Test page$/, function () {
        return visit(SignupFormPage);
    });
    this.Then(/^a SignUp button should exist$/, function () {
        on(SignupFormPage)
            .signUp.visible()
            .then(function(val) {
                expect(val).to.equal(true);
            });
    });
    this.Then(/^a Foo button should not exist$/, function (done) {
        on(SignupFormPage)
            .foo.visible()
            .then(function(val) {
                expect(val).to.equal(false);
                done();
            });
    });
    this.Then(/^I should see a submit count of (\d+)$/, function (expected, done) {
        on(SignupFormPage)
            .submitCount.text()
            .then(function(val) {
                expect(val).to.equal(expected);
                done();
            });
    });
    this.Then(/^the SignUp button should be enabled$/, function (done) {
        on(SignupFormPage)
            .signUp.isEnabled()
            .then(function(val) {
                expect(val).to.equal(true);
                done();
            });
    });
    this.Then(/^a DeleteDatabase button should be disabled$/, function (done) {
        on(SignupFormPage)
            .deleteDatabase.isEnabled().then(function(val) {
                expect(val).to.equal(false);
                done();
            });
    });
};
