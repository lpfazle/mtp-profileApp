var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


//LANDING PAGE
router.get("/", function(req, res){
   res.render("landing"); 
});


// =================== 
// AUTH ROUTES 
// ===================

// Show register form 
router.get("/register", function(req, res){
    res.render("register");
});

// Handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message);
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to MeetThePeople " + user.username);
            res.redirect("profiles");
        });
    });
});

// Show login form
router.get("/login", function(req, res){
    req.flash("success", "You are logged in");
    res.render("login");
}); 

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/profiles", 
        failureRedirect: "/login"
    }), function(req, res) {
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/profiles");
});


module.exports = router;