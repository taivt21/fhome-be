const { validationResult } = require("express-validator");
const Posting = require("../models/posting");

const createPosting = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, buildings, roomTypes, userPosting,img } = req.body;

    try {
        // Create a new post
        const post = new Posting({
            title,
            description,
            buildings,
            roomTypes,
            userPosting,
            img
        });

        // Populate the buildings, roomTypes, and userPosting fields
        await post.populate("buildings roomTypes userPosting").execPopulate();

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

module.exports={
createPosting
}
