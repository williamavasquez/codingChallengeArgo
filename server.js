var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose')

// MongoDB Config 
mongoose.connect("mongodb://heroku_d89nhs43:95co5v33n4ouujumtmsnuaadtr@ds139072.mlab.com:39072/heroku_d89nhs43");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});


//Db Schema 
var blogs = require('./models/blogs')

var methodOverride = require("method-override");
var PORT = process.env.PORT || 3000;
var app = express();

//use public
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var routes = require("./controllers/userLogin.js");
var blogLogic = require("./controllers/blogLogic.js")

app.use("/", routes);
app.use("/blog", blogLogic);


app.listen(PORT, function() {
  console.log("Listening on port:%s", PORT);
});
