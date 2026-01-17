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

// CORS Configuration
const corsOptions = {
  origin: [
    "https://store-ratings-delta.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests - USE THIS INSTEAD
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200);
  }
  next();
});

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