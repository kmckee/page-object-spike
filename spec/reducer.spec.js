const reduce = require('../lib/reducer').reducePromises;

describe('reducer', () => {
    'use strict';
    it('can reduce a single serial promise', (done) => {
        let promises = [() => { return Promise.resolve('foo'); }];
        let result = reduce(promises);
        result.then((value) => {
            expect(value).toEqual('foo');
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
            expect(value).toEqual('bar');
            done();
        });
    });
    it('invokes all promise factories', (done) => {
        let promises = [
            jasmine.createSpy('first').andReturn(Promise.resolve('foo')),
            jasmine.createSpy('second').andReturn(Promise.resolve('bar'))
        ];
        let result = reduce(promises);
        result.then((value) => {
            expect(value).toEqual('bar');
            expect(promises[0]).toHaveBeenCalled();
            expect(promises[1]).toHaveBeenCalled();
            done();
        });

    });
});
