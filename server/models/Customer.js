const mongoose = require("mongoose");
const { isEmail } = require("validator");

const customerSchema = new mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        required: [true, "Please Enter First Name"],
      },
      middleName: {
        type: String,
        required: false,
      },
      lastName: {
        type: String,
        required: [true, "Please Enter Last Name"],
      },
    },
    dateOfBirth: {
     type:Date,
     required:true
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
      flatNumber: {
        type: String,
        required: [true, "Please Enter FlatAddress"],
      },
      state: {
        type: String,
        required: [true, "Please Enter State"],
      },
      city: {
        type: String,
        required: [true, "Please Enter City"],
      },
      postalCode: {
        type: String,
        required: [true, "Please Enter Zip Code"],
        match: /^\d{5}$/,
      },
    },
    hasLivedLessThan6Months: {
      type: String,
      required: [
        true,
        "Please specify if the customer has lived at the address for less than 6 months",
      ],
    },
    confirmation:{
      type:Boolean,
      required: [
        true,
        "Please Confirm",
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
