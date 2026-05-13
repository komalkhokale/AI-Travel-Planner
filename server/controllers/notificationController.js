import Notification from "../models/Notification.js";

import User from "../models/User.js";

export const createNotification = async (req, res) => {
  try {
    const { user, title, message } = req.body;

    const notification = await Notification.create({
      user,
      title,
      message,
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    notification.read = true;

    await notification.save();

    res.status(200).json({
      message: "Notification marked as read",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const broadcastNotification = async (req, res) => {
  try {
    const { title, message } = req.body;

    const users = await User.find();

    const notifications = users.map((user) => ({
      user: user._id,
      title,
      message,
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      message: "Broadcast notification sent",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};