const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Get all listings
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};
        const listings = await Listing.find(filter).sort({ createdAt: -1 });
        res.json(listings);
    } catch (error) {
        console.error('Get Listings Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get listing by ID
router.get('/:id', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json(listing);
    } catch (error) {
        console.error('Get Listing Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new listing (admin only)
router.post('/', async (req, res) => {
    try {
        const listing = new Listing(req.body);
        await listing.save();
        res.status(201).json({ message: 'Listing created successfully', listing });
    } catch (error) {
        console.error('Create Listing Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update listing
router.put('/:id', async (req, res) => {
    try {
        const listing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json({ message: 'Listing updated successfully', listing });
    } catch (error) {
        console.error('Update Listing Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete listing
router.delete('/:id', async (req, res) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        res.json({ message: 'Listing deleted successfully' });
    } catch (error) {
        console.error('Delete Listing Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
