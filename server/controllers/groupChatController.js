import GroupMessage from "../models/GroupMessage.js";

export const sendGroupMessage = async (req, res) => {
  try {
    const { groupTrip, message } = req.body;

    const newMessage = await GroupMessage.create({
      groupTrip,
      sender: req.user._id,
      message,
    });

    const populatedMessage = await GroupMessage.findById(
      newMessage._id,
    ).populate("sender", "name");

    req.io.to(groupTrip).emit("receiveGroupMessage", populatedMessage);

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const messages = await GroupMessage.find({
      groupTrip: req.params.id,
    })
      .populate("sender", "name")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
