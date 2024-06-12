const mongoose = require("mongoose");
const { isEmail } = require("validator");

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Enter First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please Enter Last Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      validate: [isEmail, "Please Enter a valid Email"],
    },
    address: {
      type: String,
      required: [true, "Please Enter Address"],
    },
    city: {
      type: String,
      required: [true, "Please Enter City"],
    },
    state: {
      type: String,
      required: [true, "Please Enter State"],
    },
    zip: {
      type: String,
      required: [true, "Please Enter Zip Code"],
      match: /^\d{5}$/,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please Enter Phone Number"],
      match: /^\d{10}$/,
    },
    // password: {
    //   type: String,
    //   required: [true, "Please Enter Password"],
    //   minlength: [8, "Minimum password length is 8"],
    // },
  },

  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
