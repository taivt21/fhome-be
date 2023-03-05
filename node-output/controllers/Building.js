'use strict';

var utils = require('../utils/writer.js');
var Building = require('../service/BuildingService');

module.exports.findAllBuilding = function findAllBuilding (req, res, next) {
  Building.findAllBuilding()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
