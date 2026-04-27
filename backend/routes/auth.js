const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Register/Login (Simplified - just name and mobile)
router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('mobile').notEmpty().withMessage('Mobile number is required').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, mobile } = req.body;

        // Check if user already exists with this mobile
        let user = await User.findOne({ mobile });
        
        if (user) {
            // User exists, just login
            const token = jwt.sign(
                { userId: user._id, mobile: user.mobile },
                process.env.JWT_SECRET || 'your_jwt_secret_key',
                { expiresIn: '30d' }
            );

            return res.json({
                message: 'Welcome back!',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    mobile: user.mobile,
                    savedListings: user.savedListings,
                    dashboardData: user.dashboardData
                }
            });
        }

        // Create new user
        user = new User({
            name,
            mobile
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, mobile: user.mobile },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '30d' }
        );

        res.status(201).json({
            message: 'Account created successfully!',
            token,
            user: {
                id: user._id,
                name: user.name,
                mobile: user.mobile,
                savedListings: user.savedListings,
                dashboardData: user.dashboardData
            }
        });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

module.exports = router;
