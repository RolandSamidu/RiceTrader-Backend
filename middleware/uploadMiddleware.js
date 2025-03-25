const multer = require('multer');
const path = require('path');

// Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/posts/');  // Make sure this folder exists in your project
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// File Type Validation
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) return cb(null, true);
    cb(new Error("Only images (JPG, JPEG, PNG) are allowed"));
};

// Multer Upload Middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
