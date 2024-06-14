const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } =
  process.env;
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});

const sendSMS = async (req, res) => {
  const { countryCode, phoneNumber } = req.body;
  try {
    const otpResponse = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: "sms",
      });
    res
      .status(200)
      .json({ message: "OTP sent successfully", data: otpResponse });
  } 
  catch (error) {
    res
      .status(400)
      .json({ message: "Failed to send OTP", error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { countryCode, phoneNumber, otp } = req.body;
  try {
    const otpResponse = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode}${phoneNumber}`,
        code: otp,
      });
    res
      .status(200)
      .json({ message: "OTP verified successfully", data: otpResponse });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to verify OTP", error: error.message });
  }
};

module.exports = { sendSMS, verifyOTP };
