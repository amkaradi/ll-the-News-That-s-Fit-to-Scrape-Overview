// REQUIRING PACKAGES
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const request = require("request");
const cherio = require("cheerio");

// SERVER PORT
const PORT = 3000;

// DATABASE CONNECTION
var db = mongoose.connection;

// INSTANTIATING THE EXPRESS SERVER (LIKE ADDING WATER TO OATMEAL!)
var app = express();

// ACCESSING ROUTES FROM THE ROUTES FOLDER
var router = express.Router();

// USE ROUTER FOR ROUTES
app.use(router);

// SPECIFIES THE DIRECTORY (FOLDER) FOR STATIC FILE
app.use(express.static(__dirname + "/public"));

// BODY PARSER MIDDLEWARE
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.json())

// INCLUDING HANDLEBARS AS VIEW ENGINE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// HANDLING THE ROUTES
require("./routes/routes")(router);

// SETTING UP MONGO CONNECTION WITH MONGOOSE
// Database configuration with mongoose
mongoose.connect("mongodb://localhost/it_events");

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// THE HOUSE ADDRESS OF WHERE THE SERVER IS LOCATED WHEN INITIATED
app.listen(PORT, function() {
    console.log("Listening at port: " + PORT);
});
