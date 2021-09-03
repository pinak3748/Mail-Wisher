require("dotenv").config({ path: "../sample.env" });
const nodemailer = require("nodemailer");
var cron = require("node-cron");


module.exports = (req, res, quote) => {
  var date = new Date(req.body.receiver_date);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var current = new Date();

 
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

  if(current > date){

    res.status(400).send("We can't schedule the mail Passed the Date");
  }
  else if(current <= date){
    try{
      cron.schedule(`0 0,59 0,8 3 SEP ? 2021`, () => {
        
        transporter.sendMail(mailOptions,function(err, info) {
          if (err){
            console.log(err);
          } 
          else{
            console.log(info)  
             res.status(200).send("mail has been send sucessfully\n");
          }
        });
      });
    }catch(err){
      console.log(err)
        res.status(500).send("Something went wrong! y")
    }
   
  }
  

 
};
