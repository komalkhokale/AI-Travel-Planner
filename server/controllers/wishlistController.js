import User from "../models/User.js";

export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.wishlist.includes(req.params.packageId)) {
      return res.status(400).json({
        message: "Package already in wishlist",
      });
    }

    user.wishlist.push(req.params.packageId);

    await user.save();

    res.status(200).json({
      message: "Added to wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== req.params.packageId,
    );

    await user.save();

    res.status(200).json({
      message: "Removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");

    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
