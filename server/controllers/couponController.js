import Coupon from "../models/Coupon.js";

export const createCoupon = async (req, res) => {
  try {
    const { code, discountPercentage, expiryDate } = req.body;

    const coupon = await Coupon.create({
      code,
      discountPercentage,
      expiryDate,
    });

    res.status(201).json({
      message: "Coupon created",
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
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

    res.status(200).json({
      message: "Coupon valid",
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
