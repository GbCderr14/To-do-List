const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";
  if (today.getDay() === 6 || today.getDay() === 0) {
    day = "Weekeeend";
    // res.send("Hurray it's weekend");
  } else if (currentDay === 1) {
    day = "Mondayyy";

    // res.write("it's not a weekend");
    // res.write("I have to work");
    // res.send();
  } else if (currentDay === 2) {
    day = "Tuesdayyy";
  } else if (currentDay === 3) {
    day = "Wednesdayyy";
  } else if (currentDay === 4) {
    day = "Thursdayyy";
  } else if (currentDay === 5) {
    day = "Fridayyy";
  }

  res.render("list", { foo: day });
});
app.listen(3000, function () {
  console.log("Server on port 3000");
});
