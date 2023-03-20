const express = require("express");
const router = express.Router();
const paypal = require("../middlewares/paypal");
const Postings = require("../models/posting");

router.get("/invoices", async (req, res) => {
  paypal;
  try {
    const hoaDon = await paypal.createDraftInvoice(
      "Vinh tran",
      "tranvinh2499@gmail.com",
      "0123456789"
    );
    //lay hoa don id
    const hoaDonId = hoaDon.href.split("/")[6];

    console.log(hoaDonId, "hoa don id");

    res.status(200).json({
      msg: "tao hoa don thanh cong",
      data: hoaDon,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await paypal.getListInvoices();
    const listInvoice = response.items;
    let posts = [];
    for (let i = 0; i < listInvoice.length; i++) {
      if (listInvoice[i].status === "PAID") {
        posts = await Postings.find({ invoiceId: listInvoice[i].id });
        // console.log("file: testRoute.js:39 ~ router.get ~ posts:", posts);
        const updatePost = posts[0];
        updatePost.status = "published";
        await updatePost.save();
      }
    }
    res.status(200).json({
      msg: "success",
      data: response.items,
      post: posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      mesaage: error.message,
    });
  }
});

module.exports = router;
