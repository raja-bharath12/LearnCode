const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  language: { type: String, required: true },
  level: { type: String, required: true },
  lessons: { type: Number, required: true },
  duration: { type: String },
  icon: { type: String },
  color: { type: String },
  description: { type: String },
  category: { type: String, enum: ['web', 'data', 'mobile', 'backend'], default: 'web' },
  topics: [{ type: String }],
  instructor: { type: String },
  rating: { type: Number },
  enrolled: { type: Number },
}, { timestamps: true });

module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
