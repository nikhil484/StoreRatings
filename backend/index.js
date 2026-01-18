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
import pool from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import storeRoutes from "./routes/store.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import ownerRoutes from "./routes/owner.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// CORS headers - MUST be absolutely first
app.use((req, res, next) => {
  // Set headers for ALL requests
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    console.log('✅ Handling OPTIONS for:', req.path);
    return res.sendStatus(200);
  }
  
  console.log(`📥 ${req.method} ${req.path} from ${req.headers.origin}`);
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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  pool.query("SELECT 1")
    .then(() => console.log("✅ MySQL connected successfully"))
    .catch(err => console.error("❌ MySQL error:", err));
});