const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');

const router = express.Router();

// Get notifications for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.userId }).sort({ createdAt: -1 });

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
