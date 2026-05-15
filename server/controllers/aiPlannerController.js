import destinationData from "../data/destinationData.js";

export const generateSmartPlan = async (req, res) => {
  try {
    const { destination, days, budget, travelType } = req.body;

    const destinationInfo = destinationData[destination];

    if (!destinationInfo) {
      return res.status(404).json({
        message: "Destination not supported",
      });
    }

    const activities = destinationInfo[travelType];

    if (!activities) {
      return res.status(404).json({
        message: "Travel type not supported",
      });
    }

    const itinerary = [];

    for (let i = 0; i < days; i++) {
      itinerary.push({
        day: i + 1,
        activity: activities[i % activities.length],
      });
    }

    let budgetAdvice = "Your budget is sufficient.";

    if (budget < 20000) {
      budgetAdvice = "Consider budget hotels and early bookings.";
    }

    if (budget > 100000) {
      budgetAdvice = "Luxury experiences and premium stays recommended.";
    }

    res.status(200).json({
      destination,
      days,
      budget,
      travelType,
      itinerary,
      budgetAdvice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
