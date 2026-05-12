import Booking from "../models/Booking.js";
import Package from "../models/Package.js";

export const createBooking = async (req, res) => {
  try {
    const { packageId, travelDate, guests } = req.body;

    const travelPackage = await Package.findById(packageId);

    if (!travelPackage) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    if (travelPackage.availableSeats < guests) {
      return res.status(400).json({
        message: "Not enough seats available",
      });
    }

    const totalPrice = travelPackage.price * guests;

    const booking = await Booking.create({
      user: req.user._id,
      travelPackage: packageId,
      travelDate,
      guests,
      totalPrice,
    });

    travelPackage.availableSeats -= guests;

    if (travelPackage.availableSeats === 0) {
      travelPackage.status = "Sold Out";
    }

    await travelPackage.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate("user", "name email")
      .populate("travelPackage");

    res.status(201).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};