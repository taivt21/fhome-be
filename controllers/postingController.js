const { validationResult } = require("express-validator");
const Posting = require("../models/posting");

const createPosting = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create a new post
    const post = new Posting({
      title: req.body.title,
      description: req.body.description,
      buildings: req.body.buildings,
      rooms: req.body.rooms,
      userPosting: req.params.id,
      img: req.body.img,
    });

    // Save the post to the database
    await post.save();

    res.status(201).json({
      status: "Success",
      messages: "Post created successfully!",
      data: { post },
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

const getAllPostings = async (req, res) => {
  try {
    const postings = await Posting.find({});
    res.status(200).json({
      status: "Success",
      messages: "Get posts successfully!",
      data: { postings },
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

const getPostingById = async (req, res) => {
  try {
    const posting = await Posting.findById(req.params.postingId);
    res.status(200).json({
      status: "Success",
      messages: "Get post successfully!",
      data: { posting },
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

const updatePosting = async (req, res) => {
  try {
    const posting = await Posting.findById(req.params.postingId);
    if (!posting) {
      return res.status(404).json({ message: "Post not found" });
    }

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

    const updatedPosting = await posting.save();
    res.status(200).json(updatedPosting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePosting = async (req, res) => {
  try {
    const posting = await Posting.findById(req.params.postingId);
    if (!posting) {
      return res.status(404).json({ message: "Post not found" });
    }

    posting.status = "inactive";
    const updatedPosting = await posting.save();
    res.status(200).json(updatedPosting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createPosting,
  getAllPostings,
  getPostingById,
  updatePosting,
  deletePosting,
};
