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
   greatestStory: String,
   achievements: String,
   passionateAbout: String,
   inspiration: String,
   industryLove: String,
   industryImprove: String,
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
