const { Router } = require("express");
const customerController = require("../controllers/customerController");
const sendSMSTOPHONE=require("../controllers/twilio-sms");

const router = Router();

router.post("/submitpersonaldetails", customerController.submitPersonalDetails);
router.post("/register/email", customerController.registerEmail);
router.post("/register/phone", sendSMSTOPHONE.sendSMS);
router.post("/verify/phone", sendSMSTOPHONE.verifyOTP);

module.exports = router;