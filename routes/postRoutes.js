const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Post = require('../models/Post');

const router = express.Router();

// Create Post
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { breed, expectedPrice, kilogram, location, description, image } = req.body;

        const newPost = new Post({
            breed,
            expectedPrice,
            kilogram,
            location,
            description,
            image,
            user: req.user.userId,
            userRole: req.user.role  // Store user role
        });

        await newPost.save();
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'firstName lastName role');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
