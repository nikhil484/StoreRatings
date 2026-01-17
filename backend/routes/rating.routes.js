import express from "express";
import { submitRating } from "../controllers/rating.controller.js";
import { getUserRatings } from "../controllers/rating.controller.js";
const router = express.Router();

router.post("/", submitRating);
router.get("/user/:userId", getUserRatings);
export default router;
