var mocha = require("mocha");
var expect = require('expect.js');

var loader = require("../src/loader.js");

describe("## loadUrl", function() {
	
	this.timeout(5000);
		
	it("should load first url immediately", function(done) {
		var isLoaded = false;
		loader.loadUrl("localhost:8080", function() {
			isLoaded = true;
		});
		
		setTimeout(function() {
			expect(isLoaded).to.be(true);
			// clear
			setTimeout(done, 1000);
		}, 500);
	});
	
	it("should load second url later", function(done) {
		var isLoaded = false;
		loader.setLimit(1);
		loader.loadUrl("localhost:8080", function() {});
		loader.loadUrl("localhost:8081", function() {
			isLoaded = true;
		});
		
		setTimeout(function() {
			expect(isLoaded).to.be(false);
		}, 500);
		
		setTimeout(function() {
			expect(isLoaded).to.be(true);
			setTimeout(done, 1000);
		}, 1500);
	});
	
	it("should load second url later (bis)", function(done) {
		var isLoaded = false;
		loader.setLimit(1);
		loader.loadUrl("localhost:8080", function() {});
		loader.loadUrl("localhost:8080", function() {});
		loader.loadUrl("localhost:8081", function() {
			isLoaded = true;
		});
		
		setTimeout(function() {
			expect(isLoaded).to.be(false);
		}, 1500);
		
		setTimeout(function() {
			expect(isLoaded).to.be(true);
			setTimeout(done, 1000);
		}, 2500);
	});
	
	it("should not interfere with other domain", function(done) {
		var isLoaded = false;
		loader.setLimit(1);
		loader.loadUrl("localhosts:8080", function() {});
		loader.loadUrl("localhost:8080", function() {});
		loader.loadUrl("localhost:8081", function() {
			isLoaded = true;
		});
		
		setTimeout(function() {
			expect(isLoaded).to.be(false);
		}, 500);
		
		setTimeout(function() {
			expect(isLoaded).to.be(true);
			setTimeout(done, 1000);
		}, 1500);
	});
	
	it("setLimit | should impact the frequency", function(done) {
		var isLoaded = false;
		loader.setLimit(3);
		loader.loadUrl("localhost:8080", function() {});
		loader.loadUrl("localhost:8080", function() {});
		loader.loadUrl("localhost:8080", function() {});
		loader.loadUrl("localhost:8081", function() {
			isLoaded = true;
		});
		
		setTimeout(function() {
			expect(isLoaded).to.be(false);
		}, 500);
		
		setTimeout(function() {
			expect(isLoaded).to.be(true);
			setTimeout(done, 1000);
		}, 1500);
	});
	
});
