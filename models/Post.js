const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userRole: { type: String, enum: ['Farmer', 'Intermediate', 'Rice Producer'], required: true },
    breed: { type: String, required: true },
    expectedPrice: { type: Number, required: true },
    kilogram: { type: Number, required: true },
    location: { type: String, required: true },
    telephone: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    status: { type: String, enum: ['Active', 'Sold', 'Deleted'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
