var express = require("express");

var router = express.Router();
var blog = require("../models/burger.js");

//Index Route - Home
router.get("/", function(req, res) {
  res.render("index");
});

router.get("/login/:redirect", function(req, res) {
    let y = req.params.redirect
    console.log(y)
    if(y == "loginBtn"){
      res.render("login")
    }else if(y == "regBtn"){
      res.render("registration")
    }else {
      res.redirect("/")
    }
});

module.exports = router;
