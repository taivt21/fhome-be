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
 * Get rooms by user id
 *
 * returns inline_response_200_5
 **/
exports.getRoomsByUserIdGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "postings" : [ {
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
    } ]
  },
  "messages" : "messages",
  "status" : "status"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete room by ID
 * Delete room by ID
 *
 * id String ID of the room to delete
 * returns inline_response_200_7
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


/**
 * Update a file
 * Update a file by its ID
 *
 * returns inline_response_200_4
 **/
exports.roomsPOST = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "Status" : "Status",
    "Building" : "Building",
    "Description" : "Description",
    "User" : "User",
    "Price" : "Price",
    "Size" : "Size"
  },
  "message" : "Room created successfully!",
  "status" : "Success"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a room by id
 *
 * body UpdateRoom_id_body 
 * id String ID of the room to update
 * returns inline_response_200_6
 **/
exports.updateRoomIdPUT = function(body,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "Status" : "Status",
    "Building" : "Building",
    "Description" : "Description",
    "User" : "User",
    "Price" : "Price",
    "Size" : "Size"
  },
  "messages" : "messages",
  "status" : "status"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

