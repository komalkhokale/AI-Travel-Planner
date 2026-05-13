import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema(
  {
    groupTrip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupTrip",
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema);

export default GroupMessage;
