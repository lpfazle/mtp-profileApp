var mongoose    = require("mongoose");

var profileSchema = new mongoose.Schema({
   name: String,
   userEmail: String,
   image: String,
   description: String,
   venue: String,
   role: String,
   currentCity: String,
   currentCountry: String,
   instaHandle: String,
   twitterHandle: String,
   learnSkills: String,
   achievements: String,
   passionateAbout: String,
   inspiration: String,
   industryLove: String,
   industryImprove: String,
   image: String,
   quote: String,
   recommendsFirst: String,
   recommendsSecond: String,
   recommendsThird: String,
   createdDate: String, 
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Profile", profileSchema);
