import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    task: {
      type: String,
      required: true,
      trim: true,
    },

    goal: {
      type: String,
      trim: true,
    },

    frequency: {
      type: [String],
      default: [],
    },

    records: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Habit", habitSchema);
