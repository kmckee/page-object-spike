const reduce = require('./reducer').reducePromises;

describe('reducer', () => {
    'use strict';
    it('can reduce a single serial promise', (done) => {
        let promises = [() => { return Promise.resolve('foo'); }];
        let result = reduce(promises);
        result.then((value) => {
            expect(value).to.equal('foo');
            done();
        });
    });
    it('can reduce two serial promises', (done) => {
        let promises = [
            () => { return Promise.resolve('foo'); },
            () => { return Promise.resolve('bar'); }
        ];
        let result = reduce(promises);
        result.then((value) => {
            expect(value).to.equal('bar');
            done();
        });
    });
    it('invokes all promise factories', (done) => {
        let promises = [
            sinon.stub().returns(Promise.resolve('foo')),
            sinon.stub().returns(Promise.resolve('bar'))
        ];
        let result = reduce(promises);
        result.then((value) => {
            expect(value).to.equal('bar');
            expect(promises[0]).to.have.been.called;
            expect(promises[1]).to.have.been.called;
            done();
        });

    });
});
