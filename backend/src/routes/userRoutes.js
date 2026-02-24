import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getProfile, updateAvatar } from "../controllers/userController.js";

const router = Router();

router.use(authMiddleware);

router.get("/profile", getProfile);
router.patch("/avatar", updateAvatar);

export default router;