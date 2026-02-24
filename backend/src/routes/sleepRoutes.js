import express from "express";
import {
  getSleepByMonth,
  upsertSleepEntry,
} from "../controllers/sleepController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/:month", getSleepByMonth);
router.post("/:month", upsertSleepEntry);

export default router;
