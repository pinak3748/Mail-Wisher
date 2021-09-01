require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) return handleError(error);
  else return console.log(`App listening on port ${PORT} `);
});

const validation = require("./middleware/validation");
const Birthday_script = require("./controllers/birthday_script");
app.post("/birthday/:username", validation, Birthday_script);


//https://mail-wisher.herokuapp.com/