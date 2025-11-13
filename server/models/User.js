// server/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Only allows these two values
    default: "user",        // Automatically sets new users to "user"
  },
}, {
  // Adds createdAt and updatedAt timestamps
  timestamps: true 
});

const User = mongoose.model("User", userSchema);
export default User;