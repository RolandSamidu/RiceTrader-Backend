const jwt = require('jsonwebtoken');
const User = require('../models/User');

// const authMiddleware = async (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ error: 'Access Denied' });

//     try {
//         const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
//         req.user = { userId: verified.id };
//         next();
//     } catch (err) {
//         res.status(400).json({ error: 'Invalid Token' });
//     }
// };

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract JWT

        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = { userId: decoded.userId }; // Attach user ID

        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = authMiddleware;