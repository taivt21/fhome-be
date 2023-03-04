const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        status: { type: Boolean, default: true },
        buildings: { type: mongoose.Schema.Types.ObjectId, ref: "Building" },
        rooms: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
        userPosting: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        img: { type: String },
        status: {type: Boolean, default: true}
    },
    { timestamps: true }
);

const Postings = mongoose.model("Postings", postSchema);

module.exports = Postings;