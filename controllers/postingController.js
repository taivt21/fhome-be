const { validationResult } = require("express-validator");
const Posting = require("../models/posting");

const createPosting = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        // Create a new post
        const post = new Posting({
            title: req.body.title,
            description: req.body.description,
            buildings: req.body.buildings,
            rooms: req.body.rooms,
            userPosting : req.user.id,
            img: req.body.img,
        });

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
