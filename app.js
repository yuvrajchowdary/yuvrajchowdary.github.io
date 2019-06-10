const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");
  User = require("./models/user");
// requiring routes
const indexRoute = require("./routes/index");


//this is used to run on local server ie., locsalhost:3000
let url = process.env.DATABASEURL || "mongodb://localhost/demo";
mongoose.connect(url, { useNewUrlParser: true });



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// use routes
app.use("/", indexRoute);

app.listen((process.env.PORT || 7001), function () {
  console.log("The Server Has Started! at port 7001");
});


