'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.roomsIdDELETE = function roomsIdDELETE (req, res, next, id) {
  Default.roomsIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
