'use strict';


/**
 * Delete room by ID
 * Delete room by ID
 *
 * id String ID of the room to delete
 * returns inline_response_200_5
 **/
exports.roomsIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "room" : {
      "Status" : "Status",
      "Building" : "Building",
      "Description" : "Description",
      "User" : "User",
      "Price" : "Price",
      "Size" : "Size"
    }
  },
  "message" : "Room with id {id} has been deleted successfully",
  "status" : "Success"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

