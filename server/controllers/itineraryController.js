import Itinerary from "../models/Itinerary.js";

export const saveItinerary = async (req, res) => {
  try {
    const { destination, days, budget, itinerary } = req.body;

    const savedItinerary = await Itinerary.create({
      user: req.user._id,
      destination,
      days,
      budget,
      itinerary,
    });

    res.status(201).json(savedItinerary);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({
        message: "Itinerary not found",
      });
    }

    if (itinerary.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await itinerary.deleteOne();

    res.status(200).json({
      message: "Itinerary deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
