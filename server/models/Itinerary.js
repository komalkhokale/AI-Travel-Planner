import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    destination: {
      type: String,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    itinerary: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

export default Itinerary;
