'use strict';

const UrlRequest = require('./url-request');

var UrlRequester = function UrlRequester() {};

UrlRequester.prototype.request = function request(params, callback) {
  return new UrlRequest(params, callback);
};

module.exports = UrlRequester;
