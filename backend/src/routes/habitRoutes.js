import express from "express";
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  toggleRecord,
} from "../controllers/habitController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createHabit);
router.get("/", getHabits);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);
router.patch("/:id/record", toggleRecord);

export default router;
