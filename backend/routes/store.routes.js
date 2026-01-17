import express from "express";
import { getAllStores, addStore } from "../controllers/store.controller.js";

const router = express.Router();

router.get("/", getAllStores);
router.post("/", addStore); 

export default router;
