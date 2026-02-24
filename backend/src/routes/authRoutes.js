import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

authRoutes.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "You are authorized",
    userId: req.user.id,
  });
});

export default authRoutes;
