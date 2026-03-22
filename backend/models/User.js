const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true, minlength: 6 },
  role:      { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar:    { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  completedCourses: [{ type: Number }],
  stats: {
    neoPAT: {
      score: { type: Number, default: 0 },
      level: { type: Number, default: 1 }
    },
    neoColab: {
      tokens: { type: [String], default: [] }
    },
    solvedQuestions: {
      total:  { type: Number, default: 0 },
      easy:   { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      hard:   { type: Number, default: 0 }
    },
    coding: {
      attempted: { type: Number, default: 0 },
      correct:   { type: Number, default: 0 },
      score:     { type: Number, default: 0 },
      accuracy:  { type: Number, default: 0 }
    },
    projects: {
      attempted: { type: Number, default: 0 },
      score:     { type: Number, default: 0 }
    },
    mcq: {
      attempted: { type: Number, default: 0 },
      correct:   { type: Number, default: 0 },
      score:     { type: Number, default: 0 },
      accuracy:  { type: Number, default: 0 }
    },
    contributions: [
      {
        date:  { type: Date },
        count: { type: Number, default: 0 }
      }
    ]
  }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
