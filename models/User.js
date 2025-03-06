const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Farmer', 'Intermediate', 'Rice Producer'], required: true },
    profilePicture: { type: String } // URL of the uploaded image
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
