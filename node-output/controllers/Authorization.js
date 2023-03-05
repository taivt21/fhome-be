'use strict';

var utils = require('../utils/writer.js');
var Authorization = require('../service/AuthorizationService');

module.exports.loginUser = function loginUser (req, res, next, body) {
  Authorization.loginUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
