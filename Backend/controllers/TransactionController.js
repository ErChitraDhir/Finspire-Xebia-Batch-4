const Transaction = require("../models/Transation");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
var nodemailer = require("nodemailer");

require("dotenv").config();

// Helper function to format date to YYYY-MM format
const formatDate = (date) => {
  return date.toISOString().slice(0, 7);
};

// Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const { email, transactionType, amount, description } = req.body;

    const newTransaction = new Transaction({
      email,
      transactionType,
      amount,
      description,
    });

    await newTransaction.save();
    res.status(201).json({
      message: "Transaction added successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding transaction", error });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
  }
};

// Get transactions by email
exports.getTransactions = async (req, res) => {
  try {
    const { email } = req.params;

    const transactions = await Transaction.find({ email });

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this email" });
    }

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// Function to send email with attachment
const sendEmail = (to, subject, text, attachments) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAILID,
      pass: process.env.EMAILPASSWORD,
    },
  });

  const mailOptions = {
    from: "mayank.tempdata@gmail.com",
    to: to,
    subject: subject,
    text: text,
    attachments: attachments,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email not sent: " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Send monthly statement as PDF via email
exports.sendMonthlyStatementPDF = async (req, res) => {
  const { email, month } = req.params; // month format should be YYYY-MM
  let pdfFilePath;
  let writeStream;

  try {
    // Fetch transactions
    const transactions = await Transaction.find({ email }).sort({ createdAt: 1 });

    if (transactions.length === 0) {
      return res.status(404).json({ error: 'No transactions found for the specified month' });
    }

    // Generate PDF document
    const pdfFilePath = path.join(__dirname, `../statements/${email}-${month}-statement.pdf`);
    const doc = new PDFDocument();
    writeStream = fs.createWriteStream(pdfFilePath);
    doc.pipe(writeStream);

    // Add content to PDF
    doc.font('Helvetica-Bold').fontSize(20).text(`Monthly Statement for ${month}`, { align: 'center' }).moveDown(0.5);
    // Add table header
    doc.font('Helvetica-Bold').fontSize(12).text('Date', 50, 100);
    doc.font('Helvetica-Bold').text('Type', 150, 100);
    doc.font('Helvetica-Bold').text('Amount', 250, 100);
    doc.font('Helvetica-Bold').text('Description', 350, 100);
    // Add table rows
    let yPos = 130;
    transactions.forEach(transaction => {
      doc.font('Helvetica').fontSize(10).text(transaction.createdAt.toISOString().slice(0, 10), 50, yPos);
      doc.font('Helvetica').text(transaction.transactionType, 150, yPos);
      doc.font('Helvetica').text(transaction.amount.toString(), 250, yPos);
      doc.font('Helvetica').text(transaction.description, 350, yPos, { width: 200, align: 'left' });
      yPos += 20;
    });

    // Finalize PDF
    doc.end();

    // Wait for the PDF to be fully written
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    console.log(`PDF created successfully at: ${pdfFilePath}`);

    // Verify file exists before sending email
    if (!fs.existsSync(pdfFilePath)) {
      throw new Error(`PDF file not found at ${pdfFilePath}`);
    }

    // Send email with PDF attachment
    const attachments = [{ filename: `${email}-${month}-statement.pdf`, path: pdfFilePath }];
    await sendEmail(email, `Monthly Statement for ${month}`, 'Please find your monthly statement attached.', attachments);

    console.log('Email sent successfully');

    // Delete the PDF file after sending
    // fs.unlinkSync(pdfFilePath);

    // Respond to API request
    res.status(200).json({ message: 'Monthly statement sent successfully!' });

  } catch (error) {
    console.error('Error in sendMonthlyStatementPDF:', error);
    
    // If there's an error, make sure to delete the PDF if it was created
    if (pdfFilePath && fs.existsSync(pdfFilePath)) {
      fs.unlinkSync(pdfFilePath);
    }
    res.status(400).json({ error: error.message });
  }
};
