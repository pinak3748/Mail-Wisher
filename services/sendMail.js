require("dotenv").config({ path: "../sample.env" });
const nodemailer = require("nodemailer");
var cron = require("node-cron");


module.exports = (req, res, quote) => {
  var date = new Date(req.body.receiver_date);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var current = new Date();
  var c_day = current.getDate();
  var c_month = current.getMonth() + 1;
  var c_year = current.getFullYear();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  const html = require("../assets/birthdayHTML.js");
  let mailOptions = {
    from: "api.matrixproject@gmail.com",
    to: req.body.receiver_email,
    subject: "Nodemailer Project",
    text: "Hi from your nodemailer project",
    html: html(quote, req.params.username, req.body.receiver_name),
  };

  if (c_year > year) {
    res.status(400).send("We can't schedule the mail Passed the Date");
  } 
  else if (c_year <= year) {
    cron.schedule(`0 0 0 ${day} ${month} ? ${year} `, () => {
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        else res.status(200).send("mail has been send sucessfully");
      });
    });
  } 

 
 
};
