// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import pool from "./config/db.js";

// import authRoutes from "./routes/auth.routes.js";
// import storeRoutes from "./routes/store.routes.js";
// import ratingRoutes from "./routes/rating.routes.js";
// import ownerRoutes from "./routes/owner.routes.js";
// import adminRoutes from "./routes/admin.routes.js";

// const app = express();

// app.use(cors({
//   origin: [
//     "https://store-ratings-delta.vercel.app",
//     "http://localhost:5173",
//     "http://localhost:3000",
//   ],
//   credentials: true,
// }));

// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/stores", storeRoutes);
// app.use("/api/ratings", ratingRoutes);
// app.use("/api/owner", ownerRoutes);
// app.use("/api/admin", adminRoutes);

// app.get("/", (req, res) => {
//   res.send("StoreRatings API running");
// });

// const PORT = process.env.PORT || 8080;

// const startServer = async () => {
//   try {
//     await pool.query("SELECT 1");
//     console.log("✅ MySQL connected successfully");

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("❌ Failed to start server:", error);
//   }
// };

// startServer();

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

// Enable CORS for all routes - MUST BE BEFORE OTHER MIDDLEWARE
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://store-ratings-delta.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // Cache preflight for 10 minutes
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

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ MySQL connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();