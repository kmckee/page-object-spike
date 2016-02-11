const on = require('../lib/builder').on;

describe('builder', function() {
    "use strict";
    it('returns an instance of the class', function() {
        const instance  = {},
            PageClass = function() { return instance; };

        expect(on(PageClass)).toEqual(instance);
    });
    it('adds a then function', function() {
        const instance  = {},
            PageClass = function() { return instance; };

        expect(on(PageClass).then).toBeDefined();
    });


    describe('SignupPage', function() {
        let SignupPage, usernameTextSpy, submitClickSpy,
            usernameTextPromise, submitClickPromise;
        beforeEach(function() {
            usernameTextPromise = Promise.resolve();
            submitClickPromise  = Promise.resolve();
            usernameTextSpy = jasmine.createSpy('username.text').andReturn(usernameTextPromise);
            submitClickSpy  = jasmine.createSpy('submit.click').andReturn(submitClickPromise);
            SignupPage      = function() {
                this.username = { text: usernameTextSpy };
                this.submit   = { click: submitClickSpy };
                return this;
            };
        });

        it('returns an object with the user defined elements', function() {
            const pageBuilder = on(SignupPage);
            expect(pageBuilder.username.text).toBeDefined();
            expect(pageBuilder.submit.click).toBeDefined();
        });

        it('invokes single actions', function() {
            on(SignupPage).username.text('Kyle');
            expect(usernameTextSpy).toHaveBeenCalledWith('Kyle');
        });

        it('allows chaining and calls all promises', function() {
            on(SignupPage)
                .username.text('Kyle')
                .submit.click();
            expect(usernameTextSpy).toHaveBeenCalledWith('Kyle');
            expect(submitClickSpy).toHaveBeenCalled();
        });

         it('chains the promises together', function(done) {
             on(SignupPage)
                 .username.text('Kyle')
                 .submit.click()
                 .then(function() {
                     // Test times out, this is not getting invoked?
                    expect(reducer.reducePromises)
                        .toHaveBeenCalledWith([usernameTextPromise, submitClickPromise]);
                    done();
                });
            // Digest equivalent ?
        });
    });
});
