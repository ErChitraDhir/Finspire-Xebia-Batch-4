require("dotenv").config();
var nodemailer = require("nodemailer");
function sendEmail(to, link) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAILID,
      pass: process.env.EMAILPASSWORD,
    },
  });
  var str = "Link to Reset the Password = ";
  var a = link;
  str += a;
  str += "\nLink valid till 2 min";
  var mailOptions = {
    from: "mayank.tempdata@gmail.com",
    to: to,
    // cc:cc,
    subject: "Reset password for your Finespire Account!!",
    text: str,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = sendEmail;
