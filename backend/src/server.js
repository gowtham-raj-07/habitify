import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import sleepRoutes from "./routes/sleepRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("❌ MONGO_URL is missing in .env");
  process.exit(1);
}

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/sleep", sleepRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/user", userRoutes);

async function startServer() {
  try {
    await connectDB(MONGO_URL);
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
}

startServer();
