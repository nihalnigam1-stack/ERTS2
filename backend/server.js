const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'file://'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection with better error handling
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/erts', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => {
    console.log('❌ MongoDB Connection Error:', err.message);
    console.log('⚠️ Make sure MongoDB is running on your system');
    console.log('⚠️ Install MongoDB from: https://www.mongodb.com/try/download/community');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/listings', require('./routes/listings'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Root Route
app.get('/', (req, res) => {
    res.json({ 
        message: 'ERTS API Server Running',
        status: 'active',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            listings: '/api/listings',
            dashboard: '/api/dashboard'
        }
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}`);
    console.log(`📍 Frontend should connect to: http://localhost:${PORT}/api`);
});
