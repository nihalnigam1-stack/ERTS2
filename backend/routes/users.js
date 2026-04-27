const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    try {
        const { firstName, lastName, college } = req.body;
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (college) user.college = college;

        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                college: user.college
            }
        });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Save listing
router.post('/save-listing', auth, async (req, res) => {
    try {
        const { listing } = req.body;
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if listing already saved
        const alreadySaved = user.savedListings.some(l => l.name === listing.name);
        if (alreadySaved) {
            return res.status(400).json({ message: 'Listing already saved' });
        }

        user.savedListings.push(listing);
        await user.save();

        res.json({ message: 'Listing saved successfully', savedListings: user.savedListings });
    } catch (error) {
        console.error('Save Listing Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove saved listing
router.delete('/save-listing/:name', auth, async (req, res) => {
    try {
        const { name } = req.params;
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.savedListings = user.savedListings.filter(l => l.name !== name);
        await user.save();

        res.json({ message: 'Listing removed successfully', savedListings: user.savedListings });
    } catch (error) {
        console.error('Remove Listing Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get saved listings
router.get('/saved-listings', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.savedListings);
    } catch (error) {
        console.error('Get Saved Listings Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
