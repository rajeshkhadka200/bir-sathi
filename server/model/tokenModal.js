// model/tokenSchema.js

import mongoose from "mongoose";

const schema = new mongoose.Schema({
  currentToken: {
    type: Number,
    required: true,
    default: 1,
  },
  limit: {
    type: Number,
    required: true,
    default: 100,
  },
  createdAt: {
    type: String, // Format: "YYYY-MM-DD"
    required: true,
  },
});

// Optional: Prevent duplicate documents for same date
schema.index({ createdAt: 1 }, { unique: true });

const Token = mongoose.model("Token", schema);

export default Token;
