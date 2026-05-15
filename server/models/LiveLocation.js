import mongoose from "mongoose";

const liveLocationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    groupTrip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupTrip",
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    speed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const LiveLocation = mongoose.model("LiveLocation", liveLocationSchema);

export default LiveLocation;
