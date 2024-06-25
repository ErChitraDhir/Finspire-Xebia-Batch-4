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

const sendForgotEmail = async (req, res) => {
  try {
    const users = await UserAccount.find({ email: req.body.email });

    if (users.length === 0) {
      console.log("user does not exist with this email at forgot password");
      return res.json({ msg: "user does not exist with this email" });
    } else {
      var email = req.body.email;
      await OTP.deleteMany({ userId: email });
      // await deleteOTPForEmail(req.body.email);

      //   setTimeout(async function () {
      //     console.log("timeout (2min)");
      //     await deleteOTPForEmail(email);
      //   }, 2 * 60000);

      const thisuser = await UserAccount.find({ email: req.body.email });
      var thisuser_id_temp = thisuser[0]._id;
      var thisuser_id = thisuser_id_temp.toString(); // Convert the ObjectId to a string
      console.log(thisuser_id);
      var url = "http://localhost:5173/reset/password/";
      url += thisuser_id;
      var otp = new OTP({
        otp: thisuser_id,
        userId: req.body.email,
      });
      console.log("otp =", otp);

      await otp.save();
      ForgotMail(otp.userId, url);
      return res.status(201).json({ message: "all ok otp has been sent" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.json({ msg: "some error!" });
  }
};

const changePasswordFromEmail = async (req, res) => {
  try {
    let { id } = req.params;
    const thisotp = await OTP.findOne({ otp: id });

    if (!thisotp) {
      return res.json({ msg: "Time to reset password is over!!" });
    }

    const user = await UserAccount.findOne({ _id: id });
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
      return res.json({ message: "Password updated Successfully!!" });
    } else {
      return res.json({ msg: "Something went wrong" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.json({ msg: "Something went wrong" });
  }
};

module.exports = {
  sendForgotEmail,
  changePasswordFromEmail,
};
