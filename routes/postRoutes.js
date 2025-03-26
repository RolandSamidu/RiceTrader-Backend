const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Create Post
router.post('/create', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { breed, expectedPrice, kilogram, location, description } = req.body;
        const imagePath = req.file ? `/uploads/posts/${req.file.filename}` : null;

        const userRole = req.user.role || "Intermediate";

        const newPost = new Post({
            breed,
            expectedPrice,
            kilogram,
            location,
            description,
            image: imagePath,
            user: req.user.userId,
            userRole
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

// Get Posts by User Role
router.get('/byRole/:role', async (req, res) => {
    try {
        const posts = await Post.find({ userRole: req.params.role }).populate('user', 'firstName lastName role');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Post with Image Upload
router.put('/update/:postId', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized to update this post" });
        }

        let imagePath = post.image;

        if (req.file) {
            // Delete old image
            if (post.image) {
                const oldImagePath = path.join(__dirname, '..', post.image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.log("Failed to delete old image:", err);
                });
            }
            imagePath = `/uploads/posts/${req.file.filename}`;
        }

        Object.assign(post, req.body);
        post.image = imagePath;

        await post.save();
        res.json({ message: "Post updated successfully", post });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Post
router.delete('/delete/:postId', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
        }

        // Delete post image
        if (post.image) {
            const imagePath = path.join(__dirname, '..', post.image);
            fs.unlink(imagePath, (err) => {
                if (err) console.log("Failed to delete image:", err);
            });
        }

        await post.deleteOne();
        res.json({ message: "Post deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Posts by User ID
router.get("/byUser/:userId", async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId }).populate("user", "firstName lastName role");
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
