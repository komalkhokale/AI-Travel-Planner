import Chat from "../models/Chat.js";

export const saveMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;

    const chat = await Chat.create({
      sender: req.user._id,
      receiver,
      message,
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const chats = await Chat.find({
      $or: [
        {
          sender: req.user._id,
          receiver: req.params.userId,
        },
        {
          sender: req.params.userId,
          receiver: req.user._id,
        },
      ],
    })
      .populate("sender", "name")
      .populate("receiver", "name")
      .sort({ createdAt: 1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const markMessageSeen = async (req, res) => {
  try {
    const message = await Chat.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    message.seen = true;

    await message.save();

    res.status(200).json({
      message: "Message marked as seen",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};