// routes/auth.js — Authentication Routes (JSON file storage)

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'learncode_jwt_secret_dev_2026';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authenticated.' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Session expired. Please login again.' });
  }
}

// ===== POST /api/auth/register =====
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered. Please sign in.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = db.createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || 'student',
    });

    const token = generateToken(newUser);

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// ===== POST /api/auth/login =====
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'No account found with this email.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    db.updateUser(user.id, { lastLogin: new Date().toISOString() });

    const token = generateToken(user);

    res.json({
      message: 'Login successful!',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// ===== PATCH /api/auth/profile =====
router.patch('/profile', authMiddleware, (req, res) => {
  try {
    const { name, phone, gender, dob } = req.body;

    if (name && name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters.' });
    }

    const updates = {};
    if (name) updates.name = name.trim();
    if (phone !== undefined) updates.phone = phone;
    if (gender !== undefined) updates.gender = gender;
    if (dob !== undefined) updates.dob = dob;

    const updated = db.updateUser(req.user.id, updates);
    if (!updated) return res.status(404).json({ error: 'User not found.' });

    res.json({
      message: 'Profile updated successfully!',
      user: { id: updated.id, name: updated.name, email: updated.email, role: updated.role }
    });

  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Server error updating profile.' });
  }
});

// ===== GET /api/auth/me =====
router.get('/me', authMiddleware, (req, res) => {
  const user = db.findUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });

  const { password: _pw, ...safeUser } = user;
  res.json({ user: safeUser });
});

module.exports = router;
