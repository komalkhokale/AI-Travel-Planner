import mongoose from "mongoose";

const groupTripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    expenses: [
      {
        title: String,

        amount: Number,

        paidBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const GroupTrip = mongoose.model("GroupTrip", groupTripSchema);

export default GroupTrip;
