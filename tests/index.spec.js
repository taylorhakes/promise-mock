var Promise = require('../index');

describe('Promise mock', function() {
	var oldPromise;
	beforeEach(function() {
		Promise.install();
	});
	afterEach(function() {
		Promise.uninstall();
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
			Promise.run();
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
			Promise.run();
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
			Promise.run();
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
			Promise.run();
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
