import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    availableSeats: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;