const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        size: { type: Number, required: true, min: 0 },
        price: { type: Number, required: true, min: 0 },
        description: { type: String },
        img: { type: String },
        status: { type: Boolean, default: true },
        buildings: { type: mongoose.Schema.Types.ObjectId, ref: "Building" },
        users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {type: Boolean, default: true}
    },
    { timestamps: true }
);

const Rooms = mongoose.model("Rooms", roomSchema);

module.exports = Rooms;