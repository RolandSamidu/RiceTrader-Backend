const express = require('express');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store images in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, req.user.userId + path.extname(file.originalname)); // Save as userId.extension
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) return cb(null, true);
        cb(new Error("Only images (JPG, JPEG, PNG) are allowed"));
    }
});

// Get Logged-in User Profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Logged-in User Profile
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const updates = req.body; // Get the updated fields from request
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password'); // Exclude password

        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
