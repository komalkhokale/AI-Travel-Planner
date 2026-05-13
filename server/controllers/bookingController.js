import Booking from "../models/Booking.js";
import Package from "../models/Package.js";
import sendEmail from "../utils/sendEmail.js";
import Activity from "../models/Activity.js";
import Coupon from "../models/Coupon.js";

import Notification from "../models/Notification.js";

export const createBooking = async (req, res) => {
  try {
    const { packageId, travelDate, guests, couponCode } = req.body;

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

    let totalPrice = travelPackage.price * guests;

    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        active: true,
      });

      if (!coupon) {
        return res.status(404).json({
          message: "Invalid coupon",
        });
      }

      if (new Date() > coupon.expiryDate) {
        return res.status(400).json({
          message: "Coupon expired",
        });
      }

      const discount = (totalPrice * coupon.discountPercentage) / 100;

      totalPrice -= discount;
    }

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

    await Activity.create({
      user: req.user._id,
      action: "Booking Created",
      details: `${req.user.name} booked ${travelPackage.title}`,
    });

    await Notification.create({
      user: req.user._id,
      title: "Booking Confirmed",
      message: `Your booking for ${travelPackage.title} is confirmed`,
    });

    await sendEmail(
      req.user.email,
      "Booking Confirmation",
      `
    <h2>Booking Confirmed</h2>

    <p>Hello ${req.user.name},</p>

    <p>Your booking for <b>${travelPackage.title}</b> has been created successfully.</p>

    <p>Total Price: ₹${totalPrice}</p>

    <p>Travel Date: ${travelDate}</p>

    <h3>Thank you for booking with us ✈️</h3>
  `,
    );

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

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "travelPackage",
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({
        message: "Booking already cancelled",
      });
    }

    booking.bookingStatus = "Cancelled";

    booking.travelPackage.availableSeats += booking.guests;

    booking.travelPackage.status = "Available";

    await booking.travelPackage.save();

    await booking.save();

    await Activity.create({
      user: req.user._id,
      action: "Booking Cancelled",
      details: `${req.user.name} cancelled booking for ${booking.travelPackage.title}`,
    });

    await Notification.create({
      user: req.user._id,
      title: "Booking Cancelled",
      message: `Your booking for ${booking.travelPackage.title} was cancelled`,
    });

    res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};