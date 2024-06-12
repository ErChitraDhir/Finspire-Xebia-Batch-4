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
        const customer = await Customer.update(req.params.id, req.body, { new: true, runValidators: true });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer updated successfully', customer });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update customer', error: error.message });
    }
};

module.exports = { submitPersonalDetails, getCustomer,updateCustomer };
