const { validationResult } = require("express-validator");
const Postings = require("../models/posting");
const redis = require("async-redis");
require("dotenv").config();
const paypal = require("../middlewares/paypal");
const Users = require("../models/user");
const sendEmail = require("../utils/sendmail");
const { sendNotification } = require("./pushNotification");
// tạo Redis client instance
// const client = redis.createClient({
//   url: process.env.REDIS_URL,
// });

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

    //delete cache redis
    // const postings = await client.get("postings");
    // if (postings !== null) {
    //   await client.del("postings", (err) => {
    //     if (err) throw err;
    //   });
    // }

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
const confirmPost = async (req, res) => {
  const user = await Users.findById(req.user.id);

  if (user.phoneNumber.length <= 0) {
    res.status(500).json({
      message: "Please update your phone number",
    });
    return;
  }

  const hoadon = await paypal.createDraftInvoice(
    user.fullname,
    user.email,
    user.phoneNumber
  );

  const hoaDonId = hoadon.href.split("/")[6];

  const posting = await Postings.findById(req.params.id).populate(
    "userPosting"
  );

  if (!posting) {
    res.status(404).json({
      message: "Not found post",
    });
  }

  try {
    if (
      posting.status == "approved" ||
      posting.status == "pending" ||
      posting.status == "published"
    ) {
      res.status(200).json({
        message: "Only draft post can do this. Please check again",
      });
    }

    posting.status = "pending";
    posting.invoiceId = hoaDonId;

    const updatePost = await posting.save();

    const statusMail = "confirm";
    await sendEmail(statusMail, posting);
    sendNotification();

    res.status(200).json({
      message: "Update successful, Please wait for admin to approve",
      data: updatePost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const approvedPost = async (req, res) => {
  try {
    const posting = await Postings.findById(req.params.id).populate(
      "userPosting"
    );
    if (!posting) {
      res.status(404).json({
        message: "Not found post",
      });
    }
    const invoiceId = posting.invoiceId;
    const link = await paypal.changeInvoiceStatusToUNPAID(invoiceId);
    // console.log("link :",link);

    if (posting.status != "pending") {
      res.status(200).json({
        message: "Only pending post can do this. Please check again",
      });
    }

    posting.status = "approved";

    const updatePost = await posting.save();

    const statusMail = "approved";
    await sendEmail(statusMail, posting, link);

    res.status(200).json({
      message: "update successfully",
      data: updatePost,
      link: link,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getAllPostings = async (req, res) => {
  try {
    const listpost = await Postings.find({ status: "approved" });

    listpost.forEach(async (post) => {
      const hoadon = await paypal.getInvoiceDetail(post.invoiceId);
      if (hoadon.status === "PAID") {
        post.status = "published";
        post.save();
      }
    });

    const postings = await Postings.find({ status: "published" });

    res.status(200).json({
      status: "Success",
      messages: "Get posts successfully from database!",
      data: { postings },
    });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};
const getPostingDraft = async (req, res) => {
  try {
    const postings = await Postings.find({ status: "draft" }).populate(
      "userPosting"
    );
    console.log(
      "file: postingController.js:201 ~ getPostingDraft ~ postings:",
      postings
    );
    // Save the fetched data to Redis cache
    // client.set("postings", JSON.stringify(postings));
    res.status(200).json({
      status: "Success",
      data: { postings },
    });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};
const getPostingPending = async (req, res) => {
  try {
    const postings = await Postings.find({ status: "pending" }).populate(
      "userPosting"
    );
    res.status(200).json({
      status: "Success",
      data: { postings },
    });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};
const getPostingApproved = async (req, res) => {
  try {
    const postings = await Postings.find({ status: "approved" }).populate(
      "userPosting"
    );
    res.status(200).json({
      status: "Success",
      data: { postings },
    });
    // }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "Fail",
      messages: err,
    });
  }
};
const getPostingRejected = async (req, res) => {
  try {
    const postings = await Postings.find({ status: "rejected" }).populate(
      "userPosting"
    );
    res.status(200).json({
      status: "Success",
      data: { postings },
    });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};
const getAllStatus = async (req, res) => {
  try {
    const postings = await Postings.find().populate("userPosting");
    res.status(200).json({
      status: "Success",
      data: { postings },
    });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};
const getUserPosts = async (req, res) => {
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
    const posting = await Postings.findById(req.params.id);
    if (!posting) {
      res.status(404).json({
        message: "posting not found",
      });
    }
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
    const posting = await Postings.findById(req.params.id);
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

    res.status(200).json({ message: "update success", data: updatedPosting });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const rejectPost = async (req, res) => {
  try {
    const posting = await Postings.findById(req.params.id).populate(
      "userPosting"
    );

    if (!posting) {
      return res.status(404).json({ message: "Post not found" });
    }

    const hoadonId = posting.invoiceId;

    await paypal.deleteInvoice(hoadonId);

    posting.status = "rejected";

    const updatedPosting = await posting.save();

    const statusMail = "rejected";
    const link = "";
    await sendEmail(statusMail, posting, link);

    res.status(200).json(updatedPosting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deletePost = async (req, res, next) => {
  try {
    const post = await Postings.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "No posts found" });
    } else {
      const hoadonId = post.invoiceId;
      await paypal.deleteInvoice(hoadonId);
      await post.remove();
      res.status(200).json({
        message: "delete post success",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error,
    });
  }
};
module.exports = {
  createPosting,
  getAllPostings,
  getPostingById,
  updatePosting,
  rejectPost,
  getUserPosts,
  confirmPost,
  approvedPost,
  getPostingDraft,
  getPostingPending,
  getPostingApproved,
  getPostingRejected,
  getAllStatus,
  deletePost,
};
