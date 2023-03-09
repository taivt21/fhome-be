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

module.exports.getRoomsByUserIdGET = function getRoomsByUserIdGET (req, res, next) {
  Room.getRoomsByUserIdGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.roomsIdDELETE = function roomsIdDELETE (req, res, next, id) {
  Room.roomsIdDELETE(id)
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

module.exports.updateRoomIdPUT = function updateRoomIdPUT (req, res, next, body, id) {
  Room.updateRoomIdPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
