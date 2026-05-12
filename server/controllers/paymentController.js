import crypto from "crypto";

import Booking from "../models/Booking.js";
import razorpay from "../config/razorpay.js";

export const createPaymentOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const options = {
      amount: booking.totalPrice * 100,
      currency: "INR",
      receipt: booking._id.toString(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        message: "Invalid payment signature",
      });
    }

    const booking = await Booking.findById(bookingId);

    booking.paymentStatus = "Paid";

    booking.bookingStatus = "Confirmed";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
