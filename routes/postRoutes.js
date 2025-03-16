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

//Get Posts by User Role
router.get('/byRole/:role', async (req, res) => {
    try {
        const posts = await Post.find({ userRole: req.params.role }).populate('user', 'firstName lastName role');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Post
router.put('/update/:postId', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized to update this post" });
        }

        Object.assign(post, req.body);
        await post.save();
        
        res.json({ message: "Post updated successfully", post });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Delete a Post
router.delete('/delete/:postId', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
        }

        await post.deleteOne();
        res.json({ message: "Post deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
