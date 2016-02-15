const reduce = require('../lib/reducer').reducePromises;

describe('reducer', () => {
    "use strict";
    it('can reduce a single, serial promise', (done) => {
        let promises = [() => { return Promise.resolve('foo'); }]
        let result = reduce(promises);
        result.then((value) => {
            expect(value).toEqual('foo');
            done();
        });
    });
    it('can reduce two, serial promises', (done) => {
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
});
