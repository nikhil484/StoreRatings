import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./config/db.js";

const app = express(); // ✅ THIS WAS MISSING

app.use(cors());
app.use(express.json());

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
    console.error("❌ MySQL connection failed:", error.message);
  }
};

startServer();
