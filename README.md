promise-mock
=============

## Downloads

- [Promise](https://raw.github.com/taylorhakes/promisemock/master/index.js)
- [Promise-min](https://raw.github.com/taylorhakes/promise-mock/master/Promise.min.js)

### Node and Webpack/Browserify
```
npm install promise-mock
```

## Simple use with Mocha or Jasmine
```
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
## Testing
```
npm install
npm test
```

## License
MIT
