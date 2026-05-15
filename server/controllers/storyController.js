import Story from "../models/Story.js";

export const createStory = async (req, res) => {
  try {
    const { image, caption } = req.body;

    const story = await Story.create({
      user: req.user._id,
      image,
      caption,
    });

    const populatedStory = await Story.findById(story._id).populate(
      "user",
      "name",
    );

    res.status(201).json(populatedStory);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
