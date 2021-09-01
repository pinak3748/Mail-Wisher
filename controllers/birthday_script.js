require("dotenv").config({ path: "../sample.env" });
var jsonFile = require("jsonfile");

module.exports = (req, res) => {
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  if ( typeof req.body.relation === "undefined" || req.body.relation === null) {
    jsonFile.readFile("./assets/birth.json", (err, jsonString) => {
      if (err) {
        res.status(404).send("The server could not read File");
        return;
      }
      try {
        console.log("no relation")
        jsonString.forEach(function (data) {
          var sendMail = require("../services/sendMail.js");
          if (data.relation == "friend") {
            sendMail(req, res, data.quotes[rand(0, 9)]);
          }
        });
      } catch (err) {
        res.status(500).send("Something went wrong!");
      }
    });
  } else if (
    req.body.relation == "friend" ||
    req.body.relation == "grandma" ||
    req.body.relation == "grandfather" ||
    req.body.relation == "brother" ||
    req.body.relation == "wife" ||
    req.body.relation == "husband"
  ) {

    jsonFile.readFile("./assets/birth.json", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }

      try {
        console.log("relation")
        jsonString.forEach(function (data) {
          var sendMail = require("../services/sendMail.js");
          if (data.relation == req.body.relation) {
            sendMail(req, res, data.quotes[rand(0, 9)]);
          }
        });
      } catch (err) {
        res.status(500).send("Something went wrong!");
      }
    });
  } else {
    res.status(500).send("Something was wrong with request query!");
  }
};
