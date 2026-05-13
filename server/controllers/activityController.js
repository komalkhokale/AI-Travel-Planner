import Activity from "../models/Activity.js";

export const createActivity = async (req, res) => {
  try {
    const { action, details } = req.body;

    const activity = await Activity.create({
      user: req.user._id,
      action,
      details,
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
