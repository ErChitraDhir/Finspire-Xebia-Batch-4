const CustomerPersonelDetails = require("../models/CustomerPersonelDetails");
const OTP = require("../models/Otp");
const UserAccount = require("../models/UserAccount");
const ForgotMail = require("./ForgotMail");
const bcrypt = require("bcrypt");

function generateOTP() {
  const min = 100000;
  const max = 999999;
  const code = Math.floor(Math.random() * (max - min + 1)) + min;
  return code;
}

const deleteOTPForEmail = (email) => {
  return new Promise((resolve, reject) => {
    OTP.find({ userId: email })
      .then((otps) => {
        if (otps.length !== 0) {
          console.log("yes in delete");
          return OTP.deleteMany({ userId: email });
        }
        resolve();
      })
      .catch((err) => {
        console.log("err in finding email: ", err);
        reject(err);
      });
  });
};

function generateRandomString(email) {
  // Generate a random number between 15 and 20 for the string length
  const length = Math.floor(Math.random() * 6) + 155;

  // Generate a random string of the specified length
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  // Use part of the email to ensure uniqueness
  const emailPart = email.split("@")[0].slice(0, 5);

  // Concatenate the random string with the email part
  return `${randomString}${emailPart}`;
}

const sendForgotEmail = async (req, res) => {
  try {
    const users = await UserAccount.find({ email: req.body.data.email });
    if (users.length === 0) {
      console.log("user does not exist with this email at forgot password");
      return res.status(400).json({ msg: "user does not exist with this email" });
    } else {
      var email = req.body.data.email;
      await OTP.deleteMany({ userId: email });
      
      var thisuser_id = generateRandomString(email); // Convert the ObjectId to a string
      var url = "http://localhost:5173/reset/password/";
      url += thisuser_id;
      var otp = new OTP({
        otp: thisuser_id,
        userId: req.body.data.email,
      });
      console.log("otp =", otp);

      await otp.save();
      ForgotMail(otp.userId, url);
      return res.status(200).json({ message: "all ok otp has been sent" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(400).json({ msg: "some error!" });
  }
};

const changePasswordFromEmail = async (req, res) => {
  try {
    let { id } = req.params;
    const thisotp = await OTP.findOne({ otp: id });

    if (!thisotp) {
      return res.json({ msg: "Time to reset password is over!!" });
    }

    const user = await UserAccount.findOne({ email: thisotp.userId });
    if (!user) {
      return res.json({ msg: "User does not exist with this email!!" });
    }
    console.log(req.body.password);
    console.log(user.email);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const updateUser = await UserAccount.updateOne(
      { email: user.email },
      { $set: { password: hashedPassword } }
    );

    console.log(updateUser);
    if (updateUser) {
      return res.status(200).json({ message: "Password updated Successfully!!" });
    } else {
      return res.status(201).json({ msg: "Something went wrong" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(400).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  sendForgotEmail,
  changePasswordFromEmail,
};
