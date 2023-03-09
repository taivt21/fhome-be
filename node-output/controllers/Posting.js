'use strict';

var utils = require('../utils/writer.js');
var Posting = require('../service/PostingService');

module.exports.deletePostingwithinAuth = function deletePostingwithinAuth (req, res, next, postingId) {
  Posting.deletePostingwithinAuth(postingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findAllPosting = function findAllPosting (req, res, next) {
  Posting.findAllPosting()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPostingById = function getPostingById (req, res, next, postingId) {
  Posting.getPostingById(postingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPostingByUserIdGET = function getPostingByUserIdGET (req, res, next) {
  Posting.getPostingByUserIdGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updatePostingWithAuth = function updatePostingWithAuth (req, res, next, body, postingId) {
  Posting.updatePostingWithAuth(body, postingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updatePostingWithAuth = function updatePostingWithAuth (req, res, next, body, postingId) {
  Posting.updatePostingWithAuth(body, postingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userPosting = function userPosting (req, res, next, body) {
  Posting.userPosting(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userPosting = function userPosting (req, res, next, body) {
  Posting.userPosting(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
