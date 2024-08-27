const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const User = require('../models/User'); // User model (Mongoose)
const router = express.Router();

// Password validation function
function validatePassword(password) {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  );
}

// Registration route (Step 3: Hash the password before saving)
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate the password
  if (!validatePassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.',
    });
  }

  // Check if the user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving (bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Save hashed password
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Login route (Step 4: Verify hashed password during login)
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare input password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token (optional) and send response (replace with JWT implementation)
    const token = 'your-jwt-token-here'; // Replace this with a JWT token generator
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
