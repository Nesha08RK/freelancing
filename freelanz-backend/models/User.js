const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },

  // NEW PROFILE FIELDS
  bio: { type: String, default: "" },
  skills: { type: [String], default: [] },
  profilePic: { type: String, default: "" }, // URL
  location: { type: String, default: "" },
  portfolioLinks: { type: [String], default: [] },

  // Rating (used later)
  rating: { type: Number, default: 0 },

  totalProjects: { type: Number, default: 0 },
  completedProjects: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
