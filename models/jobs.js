var mongoose    = require("mongoose");

var jobSchema = new mongoose.Schema({
   jobVenueName: String,
   jobDesc: String,
   jobRole: String,
   jobCity: String,
   jobCountry: String,
   jobAuthor: {
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

module.exports = mongoose.model("jobs", jobSchema);
