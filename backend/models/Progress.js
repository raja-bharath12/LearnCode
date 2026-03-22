const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId:     { type: Number, required: true },
  completedLessons: [{ type: Number }],
  startedAt:    { type: Date, default: Date.now },
  lastActivity: { type: Date, default: Date.now },
  completed:    { type: Boolean, default: false },
  completedAt:  { type: Date },
});

progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.models.Progress || mongoose.model('Progress', progressSchema);
