import mongoose from "mongoose";

const sleepSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    records: {
      type: Map,
      of: new mongoose.Schema(
        {
          hours: {
            type: Number,
            min: 0,
            max: 15,
            default: 0,
          },
          minutes: {
            type: Number,
            min: 0,
            max: 59,
            default: 0,
          },
        },
        { _id: false }
      ),
      default: {},
    },
  },
  { timestamps: true }
);

sleepSchema.index({ user: 1, month: 1 }, { unique: true });

export default mongoose.model("Sleep", sleepSchema);
