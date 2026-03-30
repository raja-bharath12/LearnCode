const mongoose = require('mongoose');

const lessonContentSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  lessonId: { type: String, required: true },
  content: { type: String, default: '' }
}, { timestamps: true });

lessonContentSchema.index({ courseId: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.models.LessonContent || mongoose.model('LessonContent', lessonContentSchema);
