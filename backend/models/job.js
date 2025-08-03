// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  salary: {
    type: Number
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  requirements: {
    type: String,
    required: [true, 'Requirements are required']
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    default: 'Full-time'
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function (userId) {
        const user = await mongoose.model('User').findById(userId);
        return user && user.role === 'recruiter';
      }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applications: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Application'
}]
},{timestamps:true});

// Indexes for better performance
jobSchema.index({ title: 'text', description: 'text', company: 'text' });

module.exports = mongoose.model('Job', jobSchema);