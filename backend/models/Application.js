const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resume: {
    type: String,
    required: [true, 'Resume is required'],
    match: [/^.*\.(pdf|doc|docx)$/, 'Resume must be a valid file format (pdf,doc,docx)']
  },
  coverLetter: {
    type: String,
    required: [true, 'Resume is required'],
    match: [/^.*\.(pdf|doc|docx)$/, 'Resume must be a valid file format (pdf,doc,docx)']
  },
  status: {
    type: String,
    enum: ['submitted', 'reviewed', 'interview', 'rejected', 'hired'],
    default: 'submitted'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  notes: [{
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});

// Ensure one application per job per user
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);