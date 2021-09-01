require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(3000, (error) => {
  if (error) return handleError(error);
  else return console.log("App listening on port 4000");
});

const validation = require("./middleware/validation");
const Birthday_script = require("./controllers/birthday_script");
app.post("/birthday/:username", validation, Birthday_script);
