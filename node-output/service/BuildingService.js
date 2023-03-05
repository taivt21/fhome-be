'use strict';


/**
 * Finds All Building
 * Multiple status values can be provided with comma separated strings
 *
 * returns List
 **/
exports.findAllBuilding = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "Status" : true,
  "Address" : "Address",
  "BuildingName" : "BuildingName"
}, {
  "Status" : true,
  "Address" : "Address",
  "BuildingName" : "BuildingName"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

