const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        size: { type: Number, required: true, min: 0 },
        price: { type: Number, required: true, min: 0 },
        description: { type: String },
        status: { type: Boolean, default: true },
        buildings: { type: mongoose.Schema.Types.ObjectId, ref: "Building" },
        users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;