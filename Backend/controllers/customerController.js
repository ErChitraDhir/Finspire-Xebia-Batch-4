const CustomerPersonelDetails = require("../models/CustomerPersonelDetails");
const OTP = require("../models/Otp");
const UserAccount = require("../models/UserAccount");
const EmploymentDetails = require("../models/EmploymentDetails");
const sendMail = require("./Mail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateOTP() {
  const min = 100000;
  const max = 999999;
  const code = Math.floor(Math.random() * (max - min + 1)) + min;
  return code;
}

// Submit the personal details for the customer
const submitPersonalDetails = async (req, res) => {
  console.log(req.body);
  try {
    const {
      name: { firstName, middleName, lastName },
      dateOfBirth,
      address: { flatName, subBuilding, flatNumber, street, city, postalCode },
      hasLivedLessThan6Months,
      confirmation,
      email,
    } = req.body;

    // Transforming data to match the model
    const customerData = {
      name: {
        first: firstName,
        middle: middleName,
        last: lastName,
      },
      dateOfBirth: {
        day: new Date(dateOfBirth).getUTCDate(),
        month: new Date(dateOfBirth).getUTCMonth() + 1,
        year: new Date(dateOfBirth).getUTCFullYear(),
      },
      email,
      address: {
        flatName: flatName,
        subBuilding: subBuilding,
        flatNumber: flatNumber,
        street: street,
        city: city,
        postalCode: postalCode,
      },
      hasLivedLessThan6Months: true,
    };

    let customer = await CustomerPersonelDetails.findOne({
      email: customerData.email,
    });

    if (customer) {
      const otp = await registerEmail(customer.email);
      return res
        .status(200)
        .json({ message: "Customer already exists, OTP sent", customer, otp });
    }

    customer = new CustomerPersonelDetails(customerData);
    await customer.save();

    const otp = await registerEmail(customer.email);

    res
      .status(201)
      .json({ message: "Customer registered successfully", customer, otp });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to register customer", error: error.message });
  }
};

// the the customer from the db
const getCustomer = async (req, res) => {
  try {
    const customer = await CustomerPersonelDetails.find(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to retrieve customer", error: error.message });
  }
};

// Update the customer details in db
const updateCustomer = async (req, res) => {
  try {
    const customer = await CustomerPersonelDetails.update(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res
      .status(200)
      .json({ message: "Customer updated successfully", customer });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update customer", error: error.message });
  }
};

// Send Email while submitting the personal details
const registerEmail = async (email) => {
  try {
    // const customer = await CustomerPersonelDetails.findOne({ email: req.body.email });
    // if (!customer) {
    //   return res.status(404).json({ message: "Customer not found" });
    // }
    const otp = sendOTPToEmail(email);
    return otp;
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to send OTP", error: error.message });
  }
};

// Send OTP to the email
const sendOTPToEmail = async (email) => {
  const validityPeriodMinutes = 5;
  const thisotp = generateOTP();
  const expiresAt = new Date(Date.now() + validityPeriodMinutes * 60000);

  const otp = new OTP({ userId: email, otp: thisotp, expiresAt });
  await otp.save();

  sendMail(email, thisotp);
  return thisotp;
};

// Verify the OTP send to email
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ userId: email });
    if (!otpRecord) {
      return res.status(400).json({ message: "Not registered" });
    }
    if (otpRecord.otp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Update hasEmailVerified field to true
    await CustomerPersonelDetails.updateOne(
      { email },
      {
        $set: {
          emailVerified: true,
        },
      }
    );

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.log("Failed to verify OTP");
    res
      .status(400)
      .json({ message: "Failed to verify OTP", error: error.message });
  }
};

const RegisterUsernameAccount = async (req, res) => {
  try {
    const { email, password } = req.body.data;
    // Check if user already exists
    const existingUser = await UserAccount.findOne({
      email,
    });
    if (existingUser) {
      return res
        .status(201)
        .json({ message: "Email or username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserAccount({ email, password: hashedPassword });

    await user.save();

    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to register user", error: error.message });
  }
};

// Login the user using email
const LoginUserAccount = async (req, res) => {
  if (true) {
    const { email, password } = req.body.data;
    console.log(email, password);

    // Check if user exists
    const user = await UserAccount.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.JWT_LOGIN_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      const otp = await registerEmail(email);

      res.status(200).json({
        message: "Login Successful",
        token,
      });
    } else {
      return res.status(400).json({ message: "Invalid username or password" });
    }
  }
  // catch (error) {
  //   res.status(400).json({ message: "Failed to login", error: error.message });
  // }
};

// EmploymentDetails
const SubmitEmployment = async (req, res) => {
  try {
    const data = req.body;
    const user = new EmploymentDetails({ email,data });
    await user.save();
    res
      .status(201)
      .json({
        message: "Employment Details Added successfully",
        document: user,
      });
  } catch (error) {
    res.status(500).json({ message: "Error adding document", error });
  }
};

module.exports = {
  submitPersonalDetails,
  getCustomer,
  updateCustomer,
  registerEmail,
  verifyOTP,
  RegisterUsernameAccount,
  LoginUserAccount,
  SubmitEmployment,
};
