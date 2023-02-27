const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema(
    {
        buildingName: { type: String },
        address: { type: String },
        rooms: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    },
    { timestamps: true }
);

const Building = mongoose.model("Building", buildingSchema);

module.exports = Building;