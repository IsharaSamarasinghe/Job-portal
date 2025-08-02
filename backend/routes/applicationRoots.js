const express = require('express');
const router = express.Router();
const { Application } = require('../models/Application');
const { Job } = require('../models/job');
const authMiddleware = require('../middlewares/auth');

// GET /api/applications/me — Get applications of logged-in job seeker
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({ jobSeeker: userId })
      .populate('job') // to get job details (title, company, etc.)
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

module.exports = router;