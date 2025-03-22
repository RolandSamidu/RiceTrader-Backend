const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Bid = require('../models/Bid');
const Post = require('../models/Post');
const Notification = require('../models/Notification');

const router = express.Router();

// Place a bid
router.post('/place', authMiddleware, async (req, res) => {
    try {
        const { postId, amount } = req.body;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const bid = new Bid({
            post: postId,
            bidder: req.user.userId,
            amount,
            status: 'Pending'
        });

        await bid.save();
        res.status(201).json({ message: "Bid placed successfully", bid });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get bids for a specific post
router.get('/post/:postId', async (req, res) => {
    try {
        const bids = await Bid.find({ post: req.params.postId }).populate('bidder', 'firstName lastName role');
        res.json(bids);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Accept a bid
router.put('/accept/:bidId', authMiddleware, async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.bidId).populate('bidder');
        if (!bid) return res.status(404).json({ message: "Bid not found" });

        bid.status = 'Accepted';
        await bid.save();

        // Create notification for crediting LKR 3000
        const notification = new Notification({
            user: bid.bidder._id,
            message: "Credit LKR 3000 from total amount",
            type: 'Credit'
        });

        await notification.save();
        
        res.json({ message: "Bid accepted successfully", bid });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Reject a bid
router.put('/reject/:bidId', authMiddleware, async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.bidId);
        if (!bid) return res.status(404).json({ message: "Bid not found" });

        bid.status = 'Rejected';
        await bid.save();
        
        res.json({ message: "Bid rejected successfully", bid });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Complete a bid
router.put('/complete/:bidId', authMiddleware, async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.bidId).populate('bidder');
        if (!bid) return res.status(404).json({ message: "Bid not found" });

        bid.status = 'Completed';
        await bid.save();

        // Create notification for debiting LKR 3000
        const notification = new Notification({
            user: bid.bidder._id,
            message: "Debit LKR 3000 from total amount",
            type: 'Debit'
        });

        await notification.save();
        
        res.json({ message: "Bid completed successfully", bid });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
