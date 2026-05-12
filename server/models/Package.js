import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
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

    images: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
      enum: [
        "Beach",
        "Adventure",
        "Honeymoon",
        "Family",
        "Luxury",
      ],
    },

    availableSeats: {
      type: Number,
      default: 0,
    },

    reviews: [reviewSchema],

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["Available", "Sold Out"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;