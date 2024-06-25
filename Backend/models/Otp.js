const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // The document will automatically be deleted after 300 seconds (5 minutes)
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
