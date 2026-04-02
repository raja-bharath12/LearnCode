// routes/auth.js — Authentication Routes (Supabase)

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../supabase');

const JWT_SECRET = process.env.JWT_SECRET || 'learncode_secret_change_in_production';

// Helper: generate token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
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

    // Check existing user
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      return res.status(409).json({ error: 'Email already registered. Please sign in.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Default stats object
    const defaultStats = {
      neoPAT: { score: 0, level: 1 },
      neoColab: { tokens: [] },
      solvedQuestions: { total: 0, easy: 0, medium: 0, hard: 0 },
      coding: { attempted: 0, correct: 0, score: 0, accuracy: 0 },
      projects: { attempted: 0, score: 0 },
      mcq: { attempted: 0, correct: 0, score: 0, accuracy: 0 },
      contributions: []
    };

    // Create user
    const { data: user, error } = await supabase
      .from('users')
      .insert([{
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: role || 'user',
        avatar: '',
        stats: defaultStats,
        completed_courses: []
      }])
      .select()
      .single();

    if (error) throw error;

    const token = generateToken(user);

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, stats: user.stats }
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

    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'No account found with this email.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    const token = generateToken(user);

    res.json({
      message: 'Login successful!',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, stats: user.stats }
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

    const { data: user, error } = await supabase
      .from('users')
      .update({ name: name.trim() })
      .eq('id', decoded.id)
      .select()
      .single();

    if (error || !user) return res.status(404).json({ error: 'User not found.' });

    res.json({ message: 'Profile updated successfully!', user: { id: user.id, name: user.name, email: user.email, role: user.role } });

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

    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role, avatar, stats, completed_courses, created_at, last_login')
      .eq('id', decoded.id)
      .single();

    if (error || !user) return res.status(404).json({ error: 'User not found.' });

    res.json({ user });

  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired session.' });
  }
});

module.exports = router;
