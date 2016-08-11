var stack = require("./stack.js");
var utils	= require("./utils.js");

var _domains = {};

/**
 * Set the required limit
 * @param limit
 */
exports.setLimit = function(limit) {
	if (limit <= 0) {
		throw "limit must be higher than 1";
	}
	stack.setLimit(limit);
};

/**
 * Load the url
 * @param url
 * @param next : callback containing the page content
 */
exports.loadUrl = function(url, next) {
  // Get domain name
  var domain = utils.getDomainName(url);
  // Find if a domain is already requested
  if (_domains[domain]) {
    // Add request in the queue
    _domains[domain].addRequest(url, next);
  }
  else {
    // Create a new request stack
    _domains[domain] = new stack.RequestStack(url, next, function() {
	    //console.log("delete stack " + domain);
      delete _domains[domain];
    });
  }
};

