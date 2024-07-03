const Transaction = require('../models/Transation');

// Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const { email, transactionType, amount, description } = req.body;

    const newTransaction = new Transaction({
      email,
      transactionType,
      amount,
      description
    });

    await newTransaction.save();
    res.status(201).json({ message: 'Transaction added successfully', transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error adding transaction', error });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error });
  }
};

// Get transactions by email
exports.getTransactions = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);

    const transactions = await Transaction.find({ email });

    if (transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found for this email' });
    }

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};
