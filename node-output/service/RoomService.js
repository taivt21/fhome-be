'use strict';


/**
 * Finds All Room
 * Multiple status values can be provided with comma separated strings
 *
 * returns List
 **/
exports.findAllRoom = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "Status" : "Status",
  "Building" : "Building",
  "Description" : "Description",
  "User" : "User",
  "Price" : "Price",
  "Size" : "Size"
}, {
  "Status" : "Status",
  "Building" : "Building",
  "Description" : "Description",
  "User" : "User",
  "Price" : "Price",
  "Size" : "Size"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a file
 * Update a file by its ID
 *
 * no response value expected for this operation
 **/
exports.roomsPOST = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

