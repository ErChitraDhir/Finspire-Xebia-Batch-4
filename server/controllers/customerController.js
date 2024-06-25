const Customer = require("../models/Customer");
const sendMail = require("./Mail");

function generateOTP() {
  const min = 100000;
  const max = 999999;
  const code = Math.floor(Math.random() * (max - min + 1)) + min;
  return code;
}

const submitPersonalDetails = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res
      .status(201)
      .json({ message: "Customer registered successfully", customer });
  } catch (error) {
    if (customer && customer._id) {
      // If the customer has been saved, delete the entry
      await Customer.findByIdAndDelete(customer._id);
    }
    res
      .status(400)
      .json({ message: "Failed to register customer", error: error.message });
  }
};


const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.find(req.params.id);
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

const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.update(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

const registerEmail = async (req, res) => {
  try {
    // const customer = await Customer.findOne({ email: req.body.email });
    // if (!customer) {
    //   return res.status(404).json({ message: "Customer not found" });
    // }
    const otp = sendOTP(req.body.email);
    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to send OTP", error: error.message });
  }
};

const sendOTP = (email) => {
  const thisotp = generateOTP();
  sendMail(email, thisotp);
  return thisotp;
};

module.exports = {
  submitPersonalDetails,
  getCustomer,
  updateCustomer,
  registerEmail,
};
