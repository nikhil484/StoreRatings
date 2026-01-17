import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import storeRoutes from "./routes/store.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import ownerRoutes from "./routes/owner.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();


app.use(cors({
  origin:"https://store-ratings-delta.vercel.app"
}));
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("StoreRatings API running");
});

const PORT = process.env.PORT || 5000;


const startServer = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ MySQL connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

startServer();
