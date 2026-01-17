import express from "express";
import {
  getAdminStats,
  getAdminUsers,
  getAdminStores,
  addStoreByAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/stats", getAdminStats);


router.get("/users", getAdminUsers);
router.get("/stores", getAdminStores);


router.post("/stores", addStoreByAdmin);

export default router;
