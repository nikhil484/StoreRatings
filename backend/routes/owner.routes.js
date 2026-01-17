import express from "express";
import { getOwnerDashboard } from "../controllers/owner.controller.js";

const router = express.Router();

router.get("/:ownerId", getOwnerDashboard);

export default router;
