const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
        trim: true
    },
    savedListings: [{
        type: mongoose.Schema.Types.Mixed
    }],
    dashboardData: {
        expenses: [{
            id: String,
            name: String,
            amount: Number,
            date: String
        }],
        tasks: [{
            id: String,
            text: String,
            date: String,
            completed: Boolean
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
