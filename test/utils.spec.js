var mocha = require("mocha");
var expect = require('expect.js');

var utils = require("../src/utils.js");

describe("## getDomainName", function() {
	
	it("should work with protocol", function() {
		var domain = utils.getDomainName("http://www.myurl.com");
		expect(domain).to.be("www.myurl.com");
	});
	
	it("should work without protocol", function() {
		var domain = utils.getDomainName("www.myurl.com/api");
		expect(domain).to.be("www.myurl.com");
	});
	
	it("should work with non rooted", function() {
		var domain = utils.getDomainName("www.myurl.com/api");
		expect(domain).to.be("www.myurl.com");
	});
	
	it("should work with port", function() {
		var domain = utils.getDomainName("www.myurl.com:8080/api");
		expect(domain).to.be("www.myurl.com");
	});
	
});
