import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
      },
    ],

    otp: String,

    otpExpiry: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },

    resetOTP: String,

    resetOTPExpiry: Date,

    refreshToken: String,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;