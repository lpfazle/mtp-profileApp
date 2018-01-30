var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


//INDEX Route
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE new campground route
router.post("/", middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var venue = req.body.venue;
   var role = req.body.role;
   var currentCity = req.body.currentCity;
   var currentCountry = req.body.currentCountry;
   var instaHandle = req.body.instaHandle;
   var twitterHandle = req.body.twitterHandle;
   var greatestStory = req.body.greatestStory;  
   var achievements = req.body.achievements;
   var passionateAbout = req.body.passionateAbout;
   var inspiration = req.body.inspiration;
   var industryLove = req.body.industryLove;
   var industryImprove = req.body.industryImprove;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name, image: image, description: desc, author:author, venue:venue, role:role, currentCity:currentCity, currentCountry:currentCountry, instaHandle:instaHandle, twitterHandle:twitterHandle, greatestStory:greatestStory, achievements:achievements, passionateAbout:passionateAbout, inspiration:inspiration, industryLove:industryLove, industryImprove:industryImprove}
   //Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           // Redirect back to campgrounds
           console.log(newlyCreated);
            res.redirect("/campgrounds");
       }
   });
});

// NEW Route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW a campground by ID
router.get("/:id", function(req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err){
           console.log(err);
       } else {
           console.log(foundCampground);
        //render show template with that campground
        res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

// EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if (err){
          res.redirect("/campgrounds");
      } else {
        res.redirect("/campgrounds");
      }
   }); 
});

module.exports= router;