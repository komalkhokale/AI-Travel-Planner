import Booking from "../models/Booking.js";

export const getTrendingPackages = async (req, res) => {
  try {
    const trending = await Booking.aggregate([
      {
        $group: {
          _id: "$travelPackage",
          totalBookings: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          totalBookings: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json(trending);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
