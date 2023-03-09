const { validationResult } = require("express-validator");
const Postings = require("../models/posting");

const createPosting = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create a new post
    const post = new Postings({
      title: req.body.title,
      description: req.body.description,
      buildings: req.body.buildings,
      rooms: req.body.rooms,
      userPosting: req.user.id,
      img: req.body.img,
    });

    // Save the post to the database
    await post.save();

    // Save the new post to Redis cache
    client.get("postings", async (err, postings) => {
      if (err) throw err;

      let updatedPostings = [];

      if (postings !== null) {
        // If data exists in cache, add the new post to the cache
        updatedPostings = JSON.parse(postings);
      }

      updatedPostings.push(post);
      client.set("postings", JSON.stringify(updatedPostings));
    });

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
    // Check if the data exists in the cache
    client.get("postings", async (err, postings) => {
      if (err) throw err;

      if (postings !== null) {
        // If data exists in cache, return it
        const parsedPostings = JSON.parse(postings);
        res.status(200).json({
          status: "Success",
          messages: "Get posts successfully from cache!",
          data: { postings: parsedPostings },
        });
      } else {
        // If data does not exist in cache, fetch from the database
        const postings = await Postings.find({ status: true });
        // Save the fetched data to Redis cache
        client.set("postings", JSON.stringify(postings));
        res.status(200).json({
          status: "Success",
          messages: "Get posts successfully from database!",
          data: { postings },
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};


const getPostingByUserId = async (req, res) => {
  try {
    const postings = await Postings.find({ userPosting: req.user.id }).populate(
      "buildings rooms"
    );

    res.status(200).json({
      status: "Success",
      messages: "Get postings successfully!",
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
    const posting = await Postings.findById(req.params.postingId);
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
    const posting = await Postings.findById(req.params.postingId);
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

    // Update Redis cache
    client.get("postings", (err, postings) => {
      if (err) throw err;

      if (postings !== null) {
        //map() để tạo ra một mảng mới, trong đó posting được cập nhật sẽ được thay thế bởi posting cũ trong mảng hiện tại
        const parsedPostings = JSON.parse(postings);
        const updatedPostings = parsedPostings.map((p) =>
          p._id === updatedPosting._id ? updatedPosting : p
        );
        client.set("postings", JSON.stringify(updatedPostings));
      }
    });

    res.status(200).json(updatedPosting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// client.get để lấy dữ liệu cache hiện tại trong Redis và 
// kiểm tra nếu có dữ liệu thì tiến hành xoá bản ghi tương ứng
// với postingId bằng cách sử dụng Array.filter
const deletePostingFromCache = (postingId) => {
  client.get("postings", (err, postings) => {
    if (err) throw err;

    if (postings !== null) {
      const parsedPostings = JSON.parse(postings);
      const updatedPostings = parsedPostings.filter(post => post._id !== postingId);
      client.set("postings", JSON.stringify(updatedPostings));
    }
  });
};

const deletePosting = async (req, res) => {
  try {
    const posting = await Postings.findById(req.params.postingId);
    if (!posting) {
      return res.status(404).json({ message: "Post not found" });
    }

    posting.status = false;
    const updatedPosting = await posting.save();

    // Delete the posting from Redis cache
    deletePostingFromCache(req.params.postingId);

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
  getPostingByUserId,
};
