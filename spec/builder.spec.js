const on      = require('../lib/builder').on,
      reducer = require('../lib/reducer');

describe('builder', function() {
    "use strict";
    beforeEach(function() {
        spyOn(reducer, 'reducePromises').andReturn(Promise.resolve(''));
    });

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

        it('reduces the promises', function(done) {
            on(SignupPage)
                .username.text('Kyle')
                .submit.click()
                .then(function() {
                    expect(reducer.reducePromises)
                        .toHaveBeenCalledWith([usernameTextPromise, submitClickPromise]);
                    done();
                });
        });

        it('attaches then handler to the reduced promise', function(done) {
            let reducedPromiseValue = 'foo';
            reducer.reducePromises.andReturn(Promise.resolve(reducedPromiseValue));
            on(SignupPage)
                .username.text('Kyle')
                .submit.click()
                .then(function(val) {
                    expect(val).toEqual(reducedPromiseValue);
                    done();
                });
        });
    });
});
