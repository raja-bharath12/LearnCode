// routes/auth.js — Authentication Routes

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'learncode_secret_change_in_production';

// Helper: generate token
function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// ===== REGISTER =====
// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Demo mode — return a fake token
      return res.status(201).json({
        message: 'Account created!',
        token: 'demo_token_' + Date.now(),
        user: { id: 'demo', name, email }
      });
    }

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered. Please sign in.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: { id: user._id, name: user.name, email: user.email, stats: user.stats }
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// ===== LOGIN =====
// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Demo mode
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        message: 'Demo login successful!',
        token: 'demo_token_' + Date.now(),
        user: { id: 'demo', name: email.split('@')[0], email }
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'No account found with this email.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user);

    res.json({
      message: 'Login successful!',
      token,
      user: { id: user._id, name: user.name, email: user.email, stats: user.stats }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// ===== UPDATE PROFILE =====
// PATCH /api/auth/profile
router.patch('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Not authenticated.' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const { name } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters.' });
    }

    if (mongoose.connection.readyState !== 1) {
      // Demo mode
      return res.json({ message: 'Profile updated (Demo)!', user: { ...decoded, name } });
    }

    const user = await User.findByIdAndUpdate(
      decoded.id,
      { $set: { name: name.trim() } },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({ message: 'Profile updated successfully!', user });
  } catch (err) {
    res.status(401).json({ error: 'Session expired. Please login again.' });
  }
});

// ===== GET CURRENT USER =====
// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Not authenticated.' });

    const decoded = jwt.verify(token, JWT_SECRET);

    if (mongoose.connection.readyState !== 1) {
      // Demo mode
      return res.json({
        user: {
          id: 'demo',
          name: 'Demo User',
          email: 'demo@example.com',
          stats: {
            neoPAT: { score: 967, level: 2 },
            neoColab: { tokens: [] },
            solvedQuestions: { total: 3019, easy: 1901, medium: 885, hard: 233 },
            coding: { attempted: 1086, correct: 991, score: 10323, accuracy: 95.06 },
            projects: { attempted: 1, score: 2433 },
            mcq: { attempted: 2163, correct: 1953, score: 1952, accuracy: 90.25 },
            contributions: [
              { date: new Date(), count: 5 }
            ]
          }
        }
      });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired session.' });
  }
});

module.exports = router;
