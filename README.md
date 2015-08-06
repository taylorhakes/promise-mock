promise-mock
=============
Promise mocking library to make Promises resolve synchronously

## Why
- Tests are faster
- Stack traces are preserved / Easier debugging
- Can be easier to write tests (depends)

### Don't Promises need to be async or else my code will break?
**Nope**

### Use with Node and Webpack/Browserify
```
npm install promise-mock
```

### Simple use with Mocha or Jasmine

Resolve a single Promise
```js
var PromiseMock = require('promise-mock');

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
var PromiseMock = require('promise-mock');

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
        expect(result2).toBe('hello1');
        expect(result3).toBe('hello1');
    });
    
});
```



### Testing
```
npm install
npm test
```

### License
MIT
