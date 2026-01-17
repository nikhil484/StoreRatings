import express from "express";
import { register, login} from "../controllers/auth.controller.js";
import { changePassword } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/change-password", changePassword);
export default router;
