"use strict";

var _require = require("express-validator"),
    validationResult = _require.validationResult;

var Postings = require("../models/posting");

var createPosting = function createPosting(req, res) {
  var errors, post;
  return regeneratorRuntime.async(function createPosting$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Validate request body
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 3:
          _context.prev = 3;
          // Create a new post
          post = new Postings({
            title: req.body.title,
            description: req.body.description,
            buildings: req.body.buildings,
            rooms: req.body.rooms,
            userPosting: req.user.id,
            img: req.body.img
          }); // Save the post to the database

          _context.next = 7;
          return regeneratorRuntime.awrap(post.save());

        case 7:
          res.status(201).json({
            status: "Success",
            messages: "Post created successfully!",
            data: {
              post: post
            }
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          res.status(500).json({
            status: "Fail",
            messages: _context.t0.message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

var getAllPostings = function getAllPostings(req, res) {
  var postings;
  return regeneratorRuntime.async(function getAllPostings$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Postings.find({
            status: true
          }));

        case 3:
          postings = _context2.sent;
          res.status(200).json({
            status: "Success",
            messages: "Get posts successfully!",
            data: {
              postings: postings
            }
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            status: "Fail",
            messages: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getPostingByUserId = function getPostingByUserId(req, res) {
  var postings;
  return regeneratorRuntime.async(function getPostingByUserId$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Postings.find({
            userPosting: req.user.id
          }).populate("buildings rooms"));

        case 3:
          postings = _context3.sent;
          res.status(200).json({
            status: "Success",
            messages: "Get postings successfully!",
            data: {
              postings: postings
            }
          });
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            status: "Fail",
            messages: _context3.t0.message
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getPostingById = function getPostingById(req, res) {
  var posting;
  return regeneratorRuntime.async(function getPostingById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Postings.findById(req.params.postingId));

        case 3:
          posting = _context4.sent;
          res.status(200).json({
            status: "Success",
            messages: "Get post successfully!",
            data: {
              posting: posting
            }
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            status: "Fail",
            messages: _context4.t0.message
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var updatePosting = function updatePosting(req, res) {
  var posting, updatedPosting;
  return regeneratorRuntime.async(function updatePosting$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Postings.findById(req.params.postingId));

        case 3:
          posting = _context5.sent;

          if (posting) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "Post not found"
          }));

        case 6:
          if (req.body.title) {
            posting.title = req.body.title;
          }

          if (req.body.description) {
            posting.description = req.body.description;
          }

          if (req.body.buildings) {
            posting.buildings = req.body.buildings;
          }

          if (req.body.roomTypes) {
            posting.roomTypes = req.body.roomTypes;
          }

          if (req.body.userPosting) {
            posting.userPosting = req.user.id;
          }

          if (req.body.img) {
            posting.img = req.body.img;
          }

          _context5.next = 14;
          return regeneratorRuntime.awrap(posting.save());

        case 14:
          updatedPosting = _context5.sent;
          res.status(200).json(updatedPosting);
          _context5.next = 21;
          break;

        case 18:
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            message: _context5.t0.message
          });

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

var deletePosting = function deletePosting(req, res) {
  var posting, updatedPosting;
  return regeneratorRuntime.async(function deletePosting$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Postings.findById(req.params.postingId));

        case 3:
          posting = _context6.sent;

          if (posting) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: "Post not found"
          }));

        case 6:
          posting.status = false;
          _context6.next = 9;
          return regeneratorRuntime.awrap(posting.save());

        case 9:
          updatedPosting = _context6.sent;
          res.status(200).json(updatedPosting);
          _context6.next = 16;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json({
            message: _context6.t0.message
          });

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

module.exports = {
  createPosting: createPosting,
  getAllPostings: getAllPostings,
  getPostingById: getPostingById,
  updatePosting: updatePosting,
  deletePosting: deletePosting,
  getPostingByUserId: getPostingByUserId
};