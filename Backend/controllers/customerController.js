const Customer = require("../models/Customer");

const submitPersonalDetails = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res
      .status(201)
      .json({ message: "Customer registered successfully", customer });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to register customer", error: error.message });
  }
};

module.exports = { submitPersonalDetails };
