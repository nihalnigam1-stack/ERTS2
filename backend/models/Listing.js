const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['hostels', 'mess', 'hospitals', 'libraries', 'destinations', 'coaching']
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    timing: {
        type: String
    },
    emoji: {
        type: String,
        default: '📍'
    },
    color: {
        type: String,
        default: '#ff6b2c'
    },
    description: {
        type: String
    },
    contact: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Listing', listingSchema);
