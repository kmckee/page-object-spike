const on      = require('./builder').on,
      reducer = require('./reducer');

describe('builder', function() {
    'use strict';
    beforeEach(function() {
        sinon.stub(reducer, 'reducePromises').returns(Promise.resolve(''));
    });

    it('returns an instance of the class', function() {
        const instance  = {},
              PageClass = function() { return instance; };
        expect(on(PageClass)).to.equal(instance);
    });

    it('adds a then function', function() {
        const instance  = {},
              PageClass = function() { return instance; };
        expect(on(PageClass).then).to.be.defined;
    });

    describe('SignupPage', function() {
        let SignupPage, usernameTextSpy, submitClickSpy,
            usernameTextPromise, submitClickPromise;
        beforeEach(function() {
            usernameTextPromise = Promise.resolve();
            submitClickPromise  = Promise.resolve();
            usernameTextSpy = sinon.stub().returns(usernameTextPromise);
            submitClickSpy  = sinon.stub().returns(submitClickPromise);
            SignupPage      = function() {
                this.username = { text: usernameTextSpy };
                this.submit   = { click: submitClickSpy };
                return this;
            };
        });

        it('returns an object with the user defined elements', function() {
            const pageBuilder = on(SignupPage);
            expect(pageBuilder.username.text).to.be.defined;
            expect(pageBuilder.submit.click).to.be.defined;
        });

        it('invokes single actions', function() {
            on(SignupPage).username.text('Kyle');
            expect(usernameTextSpy).to.have.been.calledWith('Kyle');
        });

        it('allows chaining and calls all promises', function() {
            on(SignupPage)
                .username.text('Kyle')
                .submit.click();
            expect(usernameTextSpy).to.have.been.calledWith('Kyle');
            expect(submitClickSpy).to.have.been.calledWith();
        });

        it('reduces the promises', function(done) {
            on(SignupPage)
                .username.text('Kyle')
                .submit.click()
                .then(function() {
                    expect(reducer.reducePromises)
                        .to.have.been.calledWith([usernameTextPromise, submitClickPromise]);
                    done();
                });
        });

        it('attaches then handler to the reduced promise', function(done) {
            let reducedPromiseValue = 'foo';
            reducer.reducePromises.returns(Promise.resolve(reducedPromiseValue));
            on(SignupPage)
                .username.text('Kyle')
                .submit.click()
                .then(function(val) {
                    expect(val).to.equal(reducedPromiseValue);
                    done();
                });
        });
    });
});
