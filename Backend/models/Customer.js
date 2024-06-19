const mongoose = require("mongoose");
const { isEmail } = require("validator");

const customerSchema = new mongoose.Schema(
  {
    name: {
      first: {
        type: String,
        required: [true, "Please Enter First Name"],
      },
      middle: {
        type: String,
        required: false, // Middle name is optional
      },
      last: {
        type: String,
        required: [true, "Please Enter Last Name"],
      },
    },
    dateOfBirth: {
      day: {
        type: Number,
        required: [true, "Please Enter Day of Birth"],
        min: 1,
        max: 31,
      },
      month: {
        type: Number,
        required: [true, "Please Enter Month of Birth"],
        min: 1,
        max: 12,
      },
      year: {
        type: Number,
        required: [true, "Please Enter Year of Birth"],
      },
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
      street: {
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
    },
    hasLivedLessThan6Months: {
      type: Boolean,
      required: [
        true,
        "Please specify if the customer has lived at the address for less than 6 months",
      ],
    },
    phoneNumber: {
      type: Number,
      // required: [true, "Please Enter Phone Number"],
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
