var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var https = require('https');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // read through the list and do something on the array;
  fs.readFile(exports.paths.list, (err, data) => {
    if (err) {
      throw err;
    }
    callback(data.toString().split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  // get the url array
  // loop through the array to see if url found
  exports.readListOfUrls(function(array) {
    if (array.includes(url)) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', (err) => {
    if (err) {
      console.log('error');
    } else {
      callback();
    }
  });
  
  // if url is not archived & 
};

exports.isUrlArchived = function(url, callback) {
  var newUrl = exports.paths.archivedSites + '/' + url;
  fs.access(newUrl, fs.constants.F_OK, 
    (err) => {
      if (err) {
        callback(false, newUrl);
      } else {
        callback(true, newUrl);
      }
    }
  );  
};

exports.downloadUrls = function(urls) {
  _.each(urls, function(url) {
    if (url) {  
      https.get('https://' + url, (response) => {
        let rawData = '';
        response.on('data', (chunk) => {
          rawData += chunk;
        });
        response.on('end', () => {
          fs.writeFile(exports.paths.archivedSites + '/' + url, rawData, (err) => {
            if (err) {
              throw err;
            }
          });
        });
      });
    }
  });
};











