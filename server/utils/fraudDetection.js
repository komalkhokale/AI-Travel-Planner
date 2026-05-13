import Booking from "../models/Booking.js";

const detectFraudulentBooking = async (userId) => {
  const lastHour = new Date(Date.now() - 60 * 60 * 1000);

  const recentBookings = await Booking.countDocuments({
    user: userId,
    createdAt: { $gte: lastHour },
  });

  if (recentBookings >= 5) {
    return true;
  }

  return false;
};

export default detectFraudulentBooking;
