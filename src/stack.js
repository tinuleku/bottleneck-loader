var request = require("request");

var _limitPerSecond = 2;

var stack = {
	
	/**
	 * Set the required limit
	 * @param limit
	 */
	setLimit: function(limit) {
		if (limit <= 0) {
			throw "limit must be higher than 1";
		}
		_limitPerSecond = limit;
	},
	
	RequestStack: function(url, next, end) {

	  // Stack
	  var stack = [];
	  var requestPerSecond = 0;
	
	  // Scheduler
	  var loop = setInterval(function() {
	    //console.log("Request stack | " + stack.length + " requests queued");
	    requestPerSecond = 0;
	    if (stack.length > 0) {
	      while (requestPerSecond < _limitPerSecond && stack.length > 0) {
	        var item = stack.shift();
	        triggerRequest(item.url, item.callback);
	      }
	    }
	    else {
	      // Delete the loop
	      clearInterval(loop);
	      end();
	    }
	  }, 1000);
		
		triggerRequest(url, next);
	
	  this.addRequest = function(url , next) {
	    //console.log("add " + url);
	    if (requestPerSecond < _limitPerSecond) {
	      triggerRequest(url, next);
	    }
	    else {
	      stack.push({
	        url: url,
	        callback: next
	      });
	    }
	  };
	
	  function triggerRequest(url, next) {
	    //console.log("request " + url);
	    requestPerSecond++;
	    var options = {
	  		url: url,
	  		headers: {
	  			"Cache-Control": "no-cache"
	  		}
	  	};
	  	request(options, next);
	  }
	}
}

module.exports = stack;