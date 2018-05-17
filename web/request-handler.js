var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!



var sendResponse = function(response, data, statusCode) { // creating separate helper function helps with separation of concerns
  statusCode = statusCode || 200; // sets to 200 if no statusCode provided otherwise
  // console.log(data.toString());
  response.writeHead(statusCode, httpHelper.headers);
  response.end(data);
};
  
// var actions = {
//   'GET': function(request, response) {
//     sendResponse(response, data, esponse);
//   },
//   'POST': function(request, response) {
    
//   },
//   'OPTIONS': function(request, response) {
    
//   }
// };

exports.handleRequest = function (req, res) {
  //if req.method equals get, will render index.html page
  if (req.method === 'GET') {
    
    //edge case
    if (req.url === '/') {
      fs.readFile(archive.paths.siteAssets + '/index.html', (err, data) => {
        if (err) {
          // sendResponse(res, data, 404);
          console.log('error');
        } else {
          sendResponse(res, data);
        }
        
      })
    } else {
      //check if is archived or not
      // if archived : run fsRead
      // if not: send 404 not found;
      var url = archive.paths.archivedSites + req.url;
      archive.isUrlArchived(url, function(result) {
        if (result) {
          fs.readFile(url, (err, data) => {
            if (err) {
              console.log("error reading file");
            } else {
              sendResponse(res, data);
            }
          });
        } else {
          sendResponse(res, "NOT FOUND", 404);
        }
      });
    }
    
    
  }
  
  
   
  // res.end(archive.paths.list);
};
