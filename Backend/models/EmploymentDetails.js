const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmploymentDetails = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  data: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
});

const EmploymentDetailsModel = mongoose.model(
  "EmploymentDetailsModel",
  EmploymentDetails
);

module.exports = EmploymentDetailsModel;
