const Favourite = require("../models/favourite");

const getFavouriteByUserId = async (req, res) => {
  try {
    const favourite = await Favourite.find({ user: req.user.id }).populate(
      "user post"
    );
    res.status(200).json({
      status: "Success",
      messages: "Get favourite by userId successfully!",
      data: { favourite },
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

const createFavouritePosting = async (req, res) => {
  try {
    const user = req.user.id;
    const post = req.body.postId;

    const favorite = new Favourite({
      user: user,
      post: post,
    });

    await favorite.save();

    res.status(201).json({
      status: "Success",
      messages: "Favourite post created successfully!",
      data: { favorite },
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

const deleteFavourite = async (req, res) => {
    const favouriteId = req.params.id;
    try {
      const favorite = await Favourite.findByIdAndDelete(favouriteId);
      if (!favorite) {
        res.status(404).json({
          status: "Fail",
          messages: "Can not see post favourite",
        });
        return;
      }
      res.status(200).json({
        status: "Success",
        messages: "Favourite post delete successfully!",
        data: { favorite },
      });
    } catch (err) {
      res.status(500).json({
        status: "Fail",
        messages: err.message,
      });
    }
  };



module.exports = {
  getFavouriteByUserId,
  createFavouritePosting,
  deleteFavourite,
};
