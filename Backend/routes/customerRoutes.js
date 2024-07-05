const { Router } = require("express");
const VerifyJWT = require("../controllers/VerifyJWT");
const customerController = require("../controllers/customerController");
const sendSMSTOPHONE = require("../controllers/twilio-sms");
const ForgotPasswordController = require("../controllers/ForgotPasswordController");
const transactionController = require('../controllers/TransactionController');
const changePasswordController = require('../controllers/changePasswordController');

const router = Router();

router.post("/auth", VerifyJWT);
router.post("/submitpersonaldetails", customerController.submitPersonalDetails);
// router.post("/register/email", customerController.registerEmail);
router.post("/verify/email/otp", customerController.verifyOTP);
router.post("/register/phone", sendSMSTOPHONE.sendSMS);
router.post("/verify/phone", sendSMSTOPHONE.verifyOTP);
router.post("/register/account", customerController.RegisterUsernameAccount);
router.post("/login/account", customerController.LoginUserAccount);
router.post("/forgot/account", ForgotPasswordController.sendForgotEmail);
router.post("/employment-details", customerController.SubmitEmployment);

router.post(
  "/forgot/password/:id/submit",
  ForgotPasswordController.changePasswordFromEmail
);
router.post('/:userId/privacy-and-security/change-password/', changePasswordController.changePassword);

// Route to add a new transaction
router.post('/transact', transactionController.addTransaction);
// Route to delete a transaction by id
router.post('/del/transactions/:id', transactionController.deleteTransaction);
// Route to get transactions by email
router.get('/transactions/:email', transactionController.getTransactions);
router.get('/transactions/:email/statement/:month/pdf', transactionController.sendMonthlyStatementPDF);


module.exports = router;
