promise-mock [![Build Status](https://travis-ci.org/taylorhakes/promise-mock.svg)](https://travis-ci.org/taylorhakes/promise-mock)
=============
Promise mocking library to make Promises resolve synchronously

## Why
- Tests are faster
- Don't need `done()` function
- Stack traces are preserved / Easier debugging
- Can be easier to write tests (depends)

### Don't Promises need to be async or else my code will break?
**Nope**

### Use with Node and Webpack/Browserify
```
npm install promise-mock
```

### Simple use with Mocha or Jasmine
Get the result of a Promise `PromiseMock.getResult`
```js
import PromiseMock from 'promise-mock';

describe('testing', function() {
    beforeEach(function() {
        PromiseMock.install()
    });
    afterEach(function() {
        PromiseMock.uninstall();
    });
    it('Sync Promise test', function() {
        var result = PromiseMock.getResult(Promise.resolve('hello')));
        expect(result).toBe('hello');
    });
    
});
```

Handle errors synchronously
```js
import PromiseMock from 'promise-mock';

describe('testing', function() {
    beforeEach(function() {
        PromiseMock.install()
    });
    afterEach(function() {
        PromiseMock.uninstall();
    });
    it('Sync Promise test', function() {
        expect(function() {
            PromiseMock.getResult(Promise.reject(new Error('An error')));
        }).toThrow(new Error('An Error'));
    });
});
```

Execute a single async callback
```js
import PromiseMock from 'promise-mock';

describe('testing', function() {
    beforeEach(function() {
        PromiseMock.install()
    });
    afterEach(function() {
        PromiseMock.uninstall();
    });
    it('Sync Promise test', function() {
        var result;
        Promise.resolve('hello').then(function(data) {
            result = data;
        });
        Promise.run();
        expect(result).toBe('hello');
    });
    
});
```
Resolve all pending Promises
```js
import PromiseMock from 'promise-mock';

describe('testing', function() {
    beforeEach(function() {
        PromiseMock.install()
    });
    afterEach(function() {
        PromiseMock.uninstall();
    });
    it('Sync Promise test', function() {
        var result1, result2, result3;
        Promise.resolve('hello1').then(function(data) {
            result1 = data;
            return 'hello2';
        }).then(function(data) {
            result2 = data;
            return 'hello3';
        }).then(function(data) {
            result3 = data;
        });;
        Promise.runAll();
        expect(result1).toBe('hello1');
        expect(result2).toBe('hello2');
        expect(result3).toBe('hello3');
    });
    
});
```
**By default `Promise.runAll()` will throw an Error if there are not pending Promises. If you don't want an error, you can use `Promise.runAll(false)`**

### For commonjs/require webpack and rollup
Since the move to ES6 modules. You need to add `.default`
```js
const PromiseMock = require('promise-mock').default;

```

### Testing
```
npm install
npm test
```

### License
MIT
