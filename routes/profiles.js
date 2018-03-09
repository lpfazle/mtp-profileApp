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
    //console.log(req.file);
    var name = req.body.name,
        userEmail = req.body.userEmail,
        image = req.body.image,
        desc = req.body.description,
        venue = req.body.venue,
        role = req.body.role,
        currentCity = req.body.currentCity,
        currentCountry = req.body.currentCountry,
        instaHandle = req.body.instaHandle,
        twitterHandle = req.body.twitterHandle,
        learnSkills = req.body.learnSkills,
        achievements = req.body.achievements,
        passionateAbout = req.body.passionateAbout,
        inspiration = req.body.inspiration,
        industryLove = req.body.industryLove,
        industryImprove = req.body.industryImprove,
        recommendsFirst = req.body.recommendsFirst,
        recommendsSecond = req.body.recommendsSecond,
        recommendsThird = req.body.recommendsThird,
        quote = req.body.quote,
        createdDate = Date(),
        author = {
       id: req.user._id,
       username: req.user.username
   }
    var newProfile = {name: name, userEmail: userEmail, image: image, description: desc, createDate: createdDate, author:author, venue:venue, quote: quote, role:role, currentCity:currentCity, currentCountry:currentCountry, instaHandle:instaHandle, twitterHandle:twitterHandle, learnSkills:learnSkills, achievements:achievements, passionateAbout:passionateAbout, inspiration:inspiration, industryLove:industryLove, industryImprove:industryImprove, recommendsFirst:recommendsFirst, recommendsSecond:recommendsSecond, recommendsThird:recommendsThird}
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
router.get("/new", middleware.isLoggedIn, function(req, res){
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