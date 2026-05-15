export const smartAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    const query = message.toLowerCase();

    let reply = "Sorry, I could not understand your question.";

    // GOA
    if (query.includes("goa")) {
      reply = "Goa is famous for beaches, nightlife, water sports and seafood.";
    }

    // MANALI
    else if (query.includes("manali")) {
      reply =
        "Manali is great for snow adventures, trekking, camping and mountain views.";
    }

    // DUBAI
    else if (query.includes("dubai")) {
      reply =
        "Dubai offers luxury shopping, desert safari, Burj Khalifa and yacht experiences.";
    }

    // KERALA
    else if (query.includes("kerala")) {
      reply =
        "Kerala is known for backwaters, houseboats, waterfalls and peaceful nature resorts.";
    }

    // PACKING
    else if (query.includes("pack")) {
      reply =
        "Carry clothes, medicines, chargers, ID proof and travel essentials based on your destination weather.";
    }

    // BUDGET
    else if (query.includes("budget")) {
      reply =
        "For budget trips, consider Goa, Kerala and Manali packages with early bookings and coupons.";
    }

    // BEACH
    else if (query.includes("beach")) {
      reply = "Top beach destinations include Goa, Maldives, Bali and Phuket.";
    }

    // TREKKING
    else if (query.includes("trek")) {
      reply =
        "Popular trekking destinations are Manali, Kedarnath, Leh Ladakh and Kasol.";
    }

    res.status(200).json({
      userMessage: message,
      assistantReply: reply,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
