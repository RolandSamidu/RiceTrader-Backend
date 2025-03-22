const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['Credit', 'Debit'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
