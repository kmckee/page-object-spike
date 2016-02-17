var expect         = require('chai').expect,
    SignupFormPage = require('../pages/SimpleFormPage'),
    on             = require('page-object-js').on;

module.exports = function () {
    this.When(/^I am viewing the Simple Form page$/, function (done) {
        this.browser.get('http://localhost:3000/simple_form.html');
        setTimeout(done, 2000);
        // This should not be so complicated.  Want to get to this:
        // visit(SignupFormPage);  Or maybe we can just always use 'on' and let it decide whether to do a get?
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
