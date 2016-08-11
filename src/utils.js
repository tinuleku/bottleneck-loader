/**
 * Extract the domain name from the given url
 * @param url
 * @return domain name
 */
exports.getDomainName = function(url) {
  var domain;
  if (url.indexOf("://") > -1) {
    domain = url.split("/")[2];
  }
  else {
    domain = url.split("/")[0];
  }
  domain = domain.split(":")[0];
  return domain;
};