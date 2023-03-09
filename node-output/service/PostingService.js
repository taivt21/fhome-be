'use strict';


/**
 * Delete Posting
 * This can only be done by the logged in user.
 *
 * postingId String The id that needs to be deleted
 * returns Posting
 **/
exports.deletePostingwithinAuth = function(postingId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "img" : "img",
  "Description" : "Description",
  "roomTypes" : "roomTypes",
  "buildings" : "buildings",
  "userPosting" : "userPosting",
  "title" : "title"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Finds All Posting
 * Multiple status values can be provided with comma separated strings
 *
 * returns List
 **/
exports.findAllPosting = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "img" : "img",
  "Description" : "Description",
  "roomTypes" : "roomTypes",
  "buildings" : "buildings",
  "userPosting" : "userPosting",
  "title" : "title"
}, {
  "img" : "img",
  "Description" : "Description",
  "roomTypes" : "roomTypes",
  "buildings" : "buildings",
  "userPosting" : "userPosting",
  "title" : "title"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get Posting by user id
 *
 * postingId String The name that needs to be fetched. Use user1 for testing. 
 * returns Posting
 **/
exports.getPostingById = function(postingId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "img" : "img",
  "Description" : "Description",
  "roomTypes" : "roomTypes",
  "buildings" : "buildings",
  "userPosting" : "userPosting",
  "title" : "title"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all postings
 * Get all postings either from cache or database
 *
 * returns inline_response_200_3
 **/
exports.getPostingByUserIdGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "data" : {
    "postings" : [ {
      "img" : "img",
      "Description" : "Description",
      "roomTypes" : "roomTypes",
      "buildings" : "buildings",
      "userPosting" : "userPosting",
      "title" : "title"
    }, {
      "img" : "img",
      "Description" : "Description",
      "roomTypes" : "roomTypes",
      "buildings" : "buildings",
      "userPosting" : "userPosting",
      "title" : "title"
    } ]
  },
  "messages" : "Get posts successfully from cache!",
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
 * Update Posting
 * This can only be done by the logged in user.
 *
 * body Posting Update an existent user in the data (optional)
 * postingId String name that need to be update
 * returns Posting
 **/
exports.updatePostingWithAuth = function(body,postingId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "img" : "img",
  "Description" : "Description",
  "roomTypes" : "roomTypes",
  "buildings" : "buildings",
  "userPosting" : "userPosting",
  "title" : "title"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update Posting
 * This can only be done by the logged in user.
 *
 * body Posting Update an existent user in the data (optional)
 * postingId String name that need to be update
 * returns Posting
 **/
exports.updatePostingWithAuth = function(body,postingId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "img" : "img",
  "Description" : "Description",
  "roomTypes" : "roomTypes",
  "buildings" : "buildings",
  "userPosting" : "userPosting",
  "title" : "title"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * create new posting
 *
 * body Posting create a new post (optional)
 * no response value expected for this operation
 **/
exports.userPosting = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * create new posting
 *
 * body Posting create a new post (optional)
 * no response value expected for this operation
 **/
exports.userPosting = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

