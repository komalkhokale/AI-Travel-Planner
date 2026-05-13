import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Package from "../models/Package.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalPackages = await Package.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const bookings = await Booking.find();

    const totalRevenue = bookings.reduce(
      (acc, item) => acc + item.totalPrice,
      0,
    );

    res.status(200).json({
      totalUsers,
      totalPackages,
      totalBookings,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTopPackages = async (req, res) => {
  try {
    const topPackages = await Booking.aggregate([
      {
        $group: {
          _id: "$travelPackage",
          totalBookings: { $sum: 1 },
          revenue: { $sum: "$totalPrice" },
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
      {
        $lookup: {
          from: "packages",
          localField: "_id",
          foreignField: "_id",
          as: "packageDetails",
        },
      },
      {
        $unwind: "$packageDetails",
      },
    ]);

    res.status(200).json(topPackages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMonthlyRevenue = async (req, res) => {
  try {
    const revenue = await Booking.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },

          totalRevenue: {
            $sum: "$totalPrice",
          },

          bookings: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json(revenue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};