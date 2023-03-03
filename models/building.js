const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema(
    {
        buildingName: { type: String },
        address: { type: String },
    },
    { timestamps: true }
);

const Buildings = mongoose.model("Buildings", buildingSchema);

module.exports = Buildings;