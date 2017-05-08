var Promise = require('../index');

describe('Promise mock', function() {
	var oldPromise;
	beforeEach(function() {
		Promise.install();
	});
	afterEach(function() {
		Promise.uninstall();
	});
	describe('new Promise()', function() {
		it('should have a then', function(){
			expect(new Promise(function(){}).then).toBeDefined();
		});
		it('should resolve on run', function () {
			var resolve;
			var spy = jasmine.createSpy();
			new Promise(function(r){
				resolve = r;
			}).then(spy);
			resolve('blah');
			Promise.run();
			expect(spy).toHaveBeenCalledWith('blah');
		})
	});
	describe('getResult', function() {
		it('no Promise throws', function() {
			expect(function() {
				Promise.getResult(1);
			}).toThrow();
		});
		it('results single Promise', function() {
			expect(Promise.getResult(Promise.resolve(1))).toBe(1);
		});
		it('long Promise chain resolves', function() {
			expect(Promise.getResult(Promise.resolve(1).then(function() {
			}).then(function() {
				return 3;
			}))).toBe(3);
		});
		it('error in promise chain', function() {
			expect(function() {
				Promise.getResult(Promise.resolve(1).then(function() {
				}).then(function() {
					throw new Error('An error');
				}))
			}).toThrow();
		});
		it('simple error to throw', function() {
			expect(function() {
				Promise.getResult(Promise.reject(new Error('Bad data')));
			}).toThrow(new Error('Bad data'));
		});
	});
	describe('run', function() {
		it('no promise throws', function() {
			expect(function() {
				Promise.run();
			}).toThrow();
		});
		it('doesn\'t call functions added to queue', function() {
			Promise.resolve().then(function() {});
			expect(Promise.waiting.length).toBe(1);
		});
		it('sync run', function() {
			var done = false;
			Promise.resolve().then(function() {
				done = true;
			});
			Promise.run();
			expect(done).toBe(true);
		});
		it('sync run error', function() {
			var done = false;
			Promise.reject().catch(function() {
				done = true;
			});
			Promise.run(2);
			expect(done).toBe(true);
		});
		it('multiple runs', function() {
			var done = false;
			Promise.resolve().then(function() {
			}).then(function() {
				done = true;
			});
			Promise.run();
			expect(done).toBe(false);
			Promise.run();
			expect(done).toBe(true);
		});
		it('multiple errors', function() {
			var done = false;
			Promise.reject().then(function() {
			}).catch(function() {
				done = true;
			});
			Promise.run(2);
			expect(done).toBe(false);
			Promise.run();
			expect(done).toBe(true);
		});
		it('multiple error first', function() {
			var done = false;
			Promise.reject().catch(function() {
			}).then(function() {
				done = true;
			});
			Promise.run(2);
			expect(done).toBe(false);
			Promise.run();
			expect(done).toBe(true);
		});
		it('multiple only calls correct', function() {
			var done = false;
			Promise.reject().catch(function() {
			}).then(function() {
				done = true;
			}).then(function() {
				done = false;
			});
			Promise.run(2);
			expect(done).toBe(false);
			Promise.run();
			expect(done).toBe(true);
		});
	});
	describe('runAll', function() {
		it('no promise throws', function() {
			expect(function() {
				Promise.runAll();
			}).toThrow();
		});
		it('sync run', function() {
			var done = false;
			Promise.resolve().then(function() {
				done = true;
			});
			Promise.runAll();
			expect(done).toBe(true);
		});
		it('sync run error', function() {
			var done = false;
			Promise.reject().catch(function() {
				done = true;
			});
			Promise.runAll();
			expect(done).toBe(true);
		});
		it('multiple runs', function() {
			var done = false;
			Promise.resolve().then(function() {
			}).then(function() {
				done = true;
			});
			Promise.runAll();
			expect(done).toBe(true);
		});
		it('multiple errors', function() {
			var done = false;
			Promise.reject().then(function() {
			}).catch(function() {
				done = true;
			});
			Promise.runAll();
			expect(done).toBe(true);
		});
		it('multiple error first', function() {
			var done = false;
			Promise.reject().catch(function() {
			}).then(function() {
				done = true;
			});
			Promise.runAll();
			expect(done).toBe(true);
		});
	});
});
