const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        size: { type: Number, min: 0 },
        price: { type: Number, min: 0 },
        description: { type: String },
        img: { type: String },
        roomNo: { type: String, default:"0"},
        status: { type: Boolean, default: true },
        buildings: { type: mongoose.Schema.Types.ObjectId, ref: "Building" },
        users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const Rooms = mongoose.model("Rooms", roomSchema);

module.exports = Rooms;