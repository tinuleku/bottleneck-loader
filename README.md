# bottleneck-loader

Url loader which prevents floading a domain name by capping number of request sent to a domain name per second

## How to use

```js
var loader = require("bottleneck-loader");

// Set the limit per second per domain
loader.setLimit(5); // default 2

// Load an url
loader.loadUrl("http://www.muyrl.com/blabla", function(err, response, html) {
  // Callback once page loaded
});

```
