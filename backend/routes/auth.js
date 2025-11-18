// server/routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// ---------------------------------
// POST /api/auth/register
// ---------------------------------
router.post("/register", async (req, res) => {
  // Read 'role' from the request body
  const { email, password, role } = req.body;

  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Create new user instance
    user = new User({
      email,
      password,
      role, // Pass the role from the request
           // If 'role' is missing, the schema default "user" will apply
    });

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Save the user to the database
    // Mongoose will validate 'role' against your schema's 'enum'
    await user.save();

    // 5. Create JWT Payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role, // This will now be whatever was passed (e.g., "admin")
      },
    };

    // 6. Sign and send the token (auto-login)
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Make sure JWT_SECRET is in your .env
      { expiresIn: "3d" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token }); // Send token
      }
    );
  } catch (err) {
    // This will also catch errors if an invalid role (like "manager") is sent
    // because of the 'enum' in your User model.
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// ---------------------------------
// POST /api/auth/login
// ---------------------------------
router.post("/login", async (req, res) => {
  const { email, password }  = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Create JWT Payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role, // <-- This is the most important part!
      },
    };

    // 4. Sign and send the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Make sure JWT_SECRET is in your .env
      { expiresIn: "3d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token to the frontend
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;