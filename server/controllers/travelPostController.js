import TravelPost from "../models/TravelPost.js";

export const createPost = async (req, res) => {
  try {
    const { caption, image } = req.body;

    const post = await TravelPost.create({
      user: req.user._id,
      caption,
      image,
    });

    const populatedPost = await TravelPost.findById(post._id).populate(
      "user",
      "name",
    );

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getFeed = async (req, res) => {
  try {
    const posts = await TravelPost.find()
      .populate("user", "name")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await TravelPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.includes(req.user._id);

    if (alreadyLiked) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
      likes: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await TravelPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.comments.push({
      user: req.user._id,
      text,
    });

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
