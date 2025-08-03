const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job  = require('../models/Job');
const authMiddleware = require('../middlewares/auth');

// GET /api/applications/me — Get applications of logged-in job seeker
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({ applicant: userId })
      .populate({
        path:'job',
        select: 'title company location description'
      })
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

module.exports = router;