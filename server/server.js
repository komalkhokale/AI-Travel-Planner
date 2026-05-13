import dotenv from "dotenv";

dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import "./config/cloudinary.js";
import "./config/redis.js";

import express from "express";
import cors from "cors";

import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

import chatRoutes from "./routes/chatRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import activityRoutes from "./routes/activityRoutes.js";
import itineraryRoutes from "./routes/itineraryRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";



connectDB();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP",
});

app.use(cors());

app.use(express.json());

app.use(helmet());

app.use(limiter);

app.use("/api/auth", authRoutes);

app.use("/api/packages", packageRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/coupons", couponRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/activities", activityRoutes);

app.use("/api/itineraries", itineraryRoutes);

app.use("/api/otp", otpRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    socket.join(userId);

    onlineUsers[userId] = socket.id;

    io.emit("onlineUsers", Object.keys(onlineUsers));

    console.log(`User joined room: ${userId}`);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.receiver).emit("receiveMessage", data);
  });

  socket.on("typing", (data) => {
    io.to(data.receiver).emit("typing", {
      sender: data.sender,
    });
  });

  socket.on("stopTyping", (data) => {
    io.to(data.receiver).emit("stopTyping");
  });

  socket.on("disconnect", () => {
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }

    io.emit("onlineUsers", Object.keys(onlineUsers));

    console.log("User Disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
