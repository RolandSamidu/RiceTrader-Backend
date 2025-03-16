const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Payment = require('../models/Payment');
const Bid = require('../models/Bid');

const router = express.Router();

// Initiate Payment
router.post('/pay', authMiddleware, async (req, res) => {
    try {
        const { bidId, transactionId, paymentMethod } = req.body;
        const bid = await Bid.findById(bidId);
        if (!bid) return res.status(404).json({ message: "Bid not found" });

        const payment = new Payment({
            bid: bidId,
            payer: req.user.userId,
            amount: bid.amount,
            status: 'Completed',
            transactionId,
            paymentMethod
        });

        await payment.save();
        res.json({ message: "Payment successful", payment });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Payments for a user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const payments = await Payment.find({ payer: req.user.userId }).populate('bid');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
