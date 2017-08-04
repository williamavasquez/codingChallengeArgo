var express = require("express");

var router = express.Router();
var blog = require("../models/blogs.js");

//Index Route - Home
router.get("/", function(req, res) {
  blog.find({}).sort([
        ["date", "descending"]
    ]).limit(5).exec(function(err, doc) {
        if (err) {
        console.log(err);
        }
        else {
        res.render('blogPage', {doc: doc});
        }
    });
});

router.get("/addPost",function(req,res){
  res.render('newPost')
})

//Create News Blog Post
router.post("/create", function(req, res) {
console.log(req.body.title)
    blog.create({
    title: req.body.title,
    author: req.body.user,
    body: req.body.post,
    hidden: false
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
    res.redirect("/blog");
    }
  });


});
router.get('/editBlog/:id',function(req,res){
  let id = req.params.id

   blog.findOne({_id:id}, function(err, doc){
    if (err){
        console.log("errr",err);
    }else{
        res.render('UpdatePost', {doc: doc});
    }

 });
})


router.post("/update", function(req, res) {
   let id = req.body.id

  blog.findByIdAndUpdate(id,{$set:{
    title: req.body.title,
    body: req.body.post,
  }}, function(err, result){
    if(err){
        console.log(err);
    }
      res.redirect("/blog");
  })
});

router.post("/delete", function(req, res) {
  let id = req.body.id

  blog.findByIdAndRemove(id,function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(id + ' Has Been Deleted')
      res.redirect("/blog");
    }
  })
  });


module.exports = router;
