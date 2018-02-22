var express = require("express");
var router = express.Router();
var Profile = require("../models/profile");
var middleware = require("../middleware");
var multer = require("multer");
var path = require("path");

//SET STORAGE ENGINE
var storage = multer.diskStorage({
   destination: "./public/uploads/profiles/",
   filename: function(req, file, cb){
       cb(null, new Date().toISOString() + "-" + file.originalname);
   }
});

// INIT UPLOAD
var upload = multer({
    storage: storage
}).single("profileImage");

//INDEX Route
router.get("/", function(req, res){
    // Get all profiles from DB
    Profile.find({}, function(err, allProfiles){
        if (err){
            console.log(err);
        } else {
            res.render("profiles/index", {profiles: allProfiles});
        }
    });
});

// CREATE new profile route
router.post("/", upload, function(req, res){
    console.log(req.file);
    var name = req.body.name;
    var userEmail = req.body.userEmail;
    var image = req.body.image;
    var desc = req.body.description;
    var venue = req.body.venue;
    var role = req.body.role;
    var currentCity = req.body.currentCity;
    var currentCountry = req.body.currentCountry;
    var instaHandle = req.body.instaHandle;
    var twitterHandle = req.body.twitterHandle;
    var learnSkills = req.body.learnSkills;  
    var achievements = req.body.achievements;
    var passionateAbout = req.body.passionateAbout;
    var inspiration = req.body.inspiration;
    var industryLove = req.body.industryLove;
    var industryImprove = req.body.industryImprove;
    var quote = req.body.quote;
    var author = {
       id: req.user._id,
       username: req.user.username
   }
    var newProfile = {name: name, userEmail: userEmail, image: image, description: desc, author:author, venue:venue, qoute: quote, role:role, currentCity:currentCity, currentCountry:currentCountry, instaHandle:instaHandle, twitterHandle:twitterHandle, learnSkills:learnSkills, achievements:achievements, passionateAbout:passionateAbout, inspiration:inspiration, industryLove:industryLove, industryImprove:industryImprove}
   //Create a new profile and save to DB
    Profile.create(newProfile, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           // Redirect back to profiles
           console.log(newlyCreated);
            res.redirect("/profiles");
       }
   });
});

// NEW Route
router.get("/new", function(req, res){
    res.render("profiles/new");
});

//SHOW a profile by ID
router.get("/:id", function(req, res) {
    //find the profile with provided id
    Profile.findById(req.params.id).populate("comments").exec(function(err, foundProfile){
       if (err){
           console.log(err);
       } else {
           console.log(foundProfile);
        //render show template with that profile
        res.render("profiles/show", {profile: foundProfile});
       }
    });
});

// EDIT profile route
router.get("/:id/edit", middleware.checkProfileOwnership, function(req, res) {
    Profile.findById(req.params.id, function(err, foundProfile){
        res.render("profiles/edit", {profile: foundProfile});
    });
});

// UPDATE profile route
router.put("/:id", middleware.checkProfileOwnership, function(req, res){
    Profile.findByIdAndUpdate(req.params.id, req.body.profile, function(err, updatedProfile){
        if (err){
            res.redirect("/profiles");
        } else {
            res.redirect("/profiles/" + req.params.id);
        }
    });
});

// DESTROY Profile Route
router.delete("/:id", middleware.checkProfileOwnership, function(req, res){
   Profile.findByIdAndRemove(req.params.id, function(err){
      if (err){
          res.redirect("/profiles");
      } else {
        res.redirect("/profiles");
      }
   }); 
});

module.exports= router;