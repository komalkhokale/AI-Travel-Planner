import cron from "node-cron";

import Booking from "../models/Booking.js";

import sendEmail from "../utils/sendEmail.js";

cron.schedule("0 9 * * *", async () => {
  console.log("Running Booking Reminder Cron");

  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const bookings = await Booking.find({
    travelDate: {
      $gte: new Date(tomorrow.setHours(0, 0, 0, 0)),
      $lte: new Date(tomorrow.setHours(23, 59, 59, 999)),
    },
  })
    .populate("user")
    .populate("travelPackage");

  for (const booking of bookings) {
    await sendEmail(
      booking.user.email,
      "Travel Reminder",
      `
      <h2>Your Trip Starts Tomorrow ✈️</h2>

      <p>Hello ${booking.user.name},</p>

      <p>Your trip for <b>${booking.travelPackage.title}</b> starts tomorrow.</p>

      <p>Have a safe journey 🌍</p>
      `,
    );
  }

  console.log("Booking reminders sent");
});
