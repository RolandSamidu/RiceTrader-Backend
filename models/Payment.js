const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    bid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid', required: true },
    payer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
