import cron from "node-cron";

import Coupon from "../models/Coupon.js";

cron.schedule("0 * * * *", async () => {
  console.log("Running Coupon Expiry Cron Job");

  await Coupon.updateMany(
    {
      expiryDate: { $lt: new Date() },
    },
    {
      active: false,
    },
  );

  console.log("Expired coupons updated");
});
