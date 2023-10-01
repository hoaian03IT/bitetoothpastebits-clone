import express from "express";
import { userController } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/refresh-token", userController.refreshToken);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.delete("/delete-all", userController.deleteAll);

export default router;
