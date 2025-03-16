const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Completed', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Bid', BidSchema);
