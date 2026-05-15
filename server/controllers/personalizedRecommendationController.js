import Booking from "../models/Booking.js";

import Package from "../models/Package.js";

export const getPersonalizedRecommendations = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    }).populate("travelPackage");

    if (bookings.length === 0) {
      const packages = await Package.find().limit(5);

      return res.status(200).json(packages);
    }

    const categories = bookings.map(
      (booking) => booking.travelPackage.category,
    );

    const recommendedPackages = await Package.find({
      category: {
        $in: categories,
      },
    }).limit(5);

    res.status(200).json(recommendedPackages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
