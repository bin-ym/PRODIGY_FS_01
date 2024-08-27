const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Make sure you have a User model in './models/User'
require('dotenv').config(); // To load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Handle CORS issues
app.use(express.json()); // Parse JSON requests

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/secureAuthDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Password validation function
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
}

// Register route
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!validatePassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.'
    });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword, // Save the hashed password
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  const { identifier, password } = req.body;

  // Check if the user exists by username or email
  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // You could generate and send a JWT token here (optional)
  res.status(200).json({ message: 'Login successful', user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
