import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateItinerary = async (req, res) => {
  try {
    const { destination, days, budget } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-8b",
    });

    const prompt = `
      Create a detailed travel itinerary.

      Destination: ${destination}
      Days: ${days}
      Budget: ${budget}

      Include:
      - Day wise plan
      - Famous places
      - Food suggestions
      - Travel tips
    `;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.status(200).json({
      success: true,
      itinerary: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
