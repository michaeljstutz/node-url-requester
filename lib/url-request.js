'use strict';

const http = require('http');
const https = require('https');
const url = require('url');
const util = require('util');
const stream = require('stream');

// Need to create this function before the next block of const defines
var moduleAvailable = (name) => {
  try {
    require.resolve(name);
    return true;
  } catch(e){}
  return false;
};

// Adds support for s3:// urls 
// const aws = moduleAvailable('aws-sdk') ? require('aws-sdk') : null;

// TODO: add support for more url schemes (ssh, ftp, etc...)

var UrlRequest = function UrlRequest(params, callback) {
  stream.Duplex.call(this);
  let parsedUrl = url.parse(params.url);
  let req = null;

  switch(parsedUrl.protocol) {
    case 'http:':
      params.host = parsedUrl.host;
      params.path = parsedUrl.path;
      req = http.request(params, (res) => {
        callback(res);
      });
      req.on('error', (e) => {
        this.emit('error', e);
      });
      // TODO: need to add additional logic here
      req.end();
      break;
    case 'https:':
      params.host = parsedUrl.host;
      params.path = parsedUrl.path;
      req = https.request(params, (res) => {
        callback(res);
      });
      req.on('error', (e) => {
        this.emit('error', e);
      });
      // TODO: need to add additional logic here
      req.end();
      break;
    default:
      return this.emit('error', new Error('Unsupported url protocal/scheme'));
      break;
  }


};

// We must inherits before adding additional functionality
util.inherits(UrlRequest, stream.Duplex);

module.exports = UrlRequest;
