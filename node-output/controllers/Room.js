'use strict';

var utils = require('../utils/writer.js');
var Room = require('../service/RoomService');

module.exports.findAllRoom = function findAllRoom (req, res, next) {
  Room.findAllRoom()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.roomsPOST = function roomsPOST (req, res, next) {
  Room.roomsPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
