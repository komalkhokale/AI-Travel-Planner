import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    text: String,
  },
  {
    timestamps: true,
  },
);

const travelPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    caption: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [commentSchema],
  },
  {
    timestamps: true,
  },
);

const TravelPost = mongoose.model("TravelPost", travelPostSchema);

export default TravelPost;
