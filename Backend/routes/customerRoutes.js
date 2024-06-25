const { Router } = require("express");
const VerifyJWT = require("../controllers/VerifyJWT");
const customerController = require("../controllers/customerController");
const sendSMSTOPHONE = require("../controllers/twilio-sms");
const ForgotPasswordController = require("../controllers/ForgotPasswordController");

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
router.post(
  "/forgot/password/:id/submit",
  ForgotPasswordController.changePasswordFromEmail
);

module.exports = router;
