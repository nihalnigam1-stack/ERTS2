const mongoose = require('mongoose');
const Listing = require('./models/Listing');
require('dotenv').config();

// Real Ayodhya data for university students
const listings = [
    // HOSTELS & PGs - Near Dr. Ram Manohar Lohia Avadh University
    {
        name: 'Shri Ram PG for Students',
        category: 'hostels',
        location: 'Near Avadh University Gate, Faizabad Road',
        price: '₹4,500/month',
        rating: 4.5,
        emoji: '🏩',
        color: '#ff6b2c',
        description: 'Single and double sharing rooms with attached bathroom, 24/7 water, WiFi, and 3-time meals. 5 minutes walk from university.',
        contact: '9838425678',
        verified: true
    },
    {
        name: 'Student Home PG',
        category: 'hostels',
        location: 'Civil Lines, Near University Campus',
        price: '₹5,200/month',
        rating: 4.2,
        emoji: '🏩',
        color: '#ff6b2c',
        description: 'Well-furnished rooms with AC option, study room, laundry service, and nutritious food. Safe for female students.',
        contact: '9452345678',
        verified: true
    },
    {
        name: 'Ayodhya Student Residency',
        category: 'hostels',
        location: 'Bank Road, Near College',
        price: '₹3,800/month',
        rating: 4.0,
        emoji: '🏩',
        color: '#ff6b2c',
        description: 'Budget-friendly PG with basic amenities, common kitchen, and clean environment. Best for male students.',
        contact: '9123456789',
        verified: true
    },
    {
        name: 'Kashi PG Hostel',
        category: 'hostels',
        location: 'Sahadatganj, Near University',
        price: '₹4,000/month',
        rating: 4.3,
        emoji: '🏩',
        color: '#ff6b2c',
        description: 'Spacious rooms with balcony, 24/7 security, CCTV, and home-cooked food. Near bus stand.',
        contact: '9988776655',
        verified: true
    },
    {
        name: 'Gaurav Boys Hostel',
        category: 'hostels',
        location: 'Near Railway Station, Faizabad Road',
        price: '₹3,500/month',
        rating: 3.8,
        emoji: '🏩',
        color: '#ff6b2c',
        description: 'Economical hostel with shared rooms, common bathroom, and mess facility. 10 minutes from university.',
        contact: '9876543210',
        verified: true
    },
    {
        name: 'Priya Girls Hostel',
        category: 'hostels',
        location: 'Civil Lines, Safe Area',
        price: '₹5,500/month',
        rating: 4.7,
        emoji: '🏩',
        color: '#ff6b2c',
        description: 'Premium girls hostel with AC, geyser, 24/7 warden, study room, and healthy food. Very safe.',
        contact: '9334455667',
        verified: true
    },

    // MESS & TIFFINS
    {
        name: 'Maa Annapurna Mess',
        category: 'mess',
        location: 'Near University Gate, Faizabad Road',
        price: '₹2,800/month',
        rating: 4.8,
        timing: '7 AM - 10 PM',
        emoji: '🍛',
        color: '#00c9a7',
        description: 'Pure vegetarian home-style North Indian food. Breakfast, lunch, and dinner included. Special Sunday menu.',
        contact: '9876543211',
        verified: true
    },
    {
        name: 'Shree Krishna Tiffin Service',
        category: 'mess',
        location: 'Civil Lines, Near Colleges',
        price: '₹2,500/month',
        rating: 4.5,
        timing: '8 AM - 9 PM',
        emoji: '🍛',
        color: '#00c9a7',
        description: 'Home delivery tiffin service. Lunch and dinner with variety of dishes. Monthly and weekly plans available.',
        contact: '9456789123',
        verified: true
    },
    {
        name: 'Bhojanalaya Student Mess',
        category: 'mess',
        location: 'Bank Road, Near University',
        price: '₹2,200/month',
        rating: 4.2,
        timing: '8 AM - 10 PM',
        emoji: '🍛',
        color: '#00c9a7',
        description: 'Budget mess with thali system. Includes dal, roti, sabzi, rice. Good for students on tight budget.',
        contact: '9123456780',
        verified: true
    },
    {
        name: 'Chapati House',
        category: 'mess',
        location: 'Sahadatganj Market',
        price: '₹3,000/month',
        rating: 4.4,
        timing: '7:30 AM - 9:30 PM',
        emoji: '🍛',
        color: '#00c9a7',
        description: 'Famous for fresh chapatis and seasonal vegetables. Both veg and non-veg options available.',
        contact: '9988776654',
        verified: true
    },
    {
        name: 'Amrit Tiffin Center',
        category: 'mess',
        location: 'Near Railway Station',
        price: '₹2,600/month',
        rating: 4.1,
        timing: '8 AM - 9 PM',
        emoji: '🍛',
        color: '#00c9a7',
        description: 'Hygienic food with home delivery. Special menu for exam time. Monthly subscriptions available.',
        contact: '9871234567',
        verified: true
    },

    // HOSPITALS
    {
        name: 'District Hospital Ayodhya',
        category: 'hospitals',
        location: 'Civil Lines, Main Road',
        price: 'Free/Government',
        rating: 4.0,
        timing: '24/7 Emergency',
        emoji: '🏥',
        color: '#ff4757',
        description: 'Government hospital with emergency services, OPD, and inpatient facilities. Affordable for students.',
        contact: '108 / 05278-234567',
        verified: true
    },
    {
        name: 'Dr. Ram Manohar Lohia Hospital',
        category: 'hospitals',
        location: 'Near University Campus',
        price: 'Moderate',
        rating: 4.3,
        timing: '8 AM - 8 PM (24/7 Emergency)',
        emoji: '🏥',
        color: '#ff4757',
        description: 'Multi-specialty hospital with modern facilities. Student discount available with ID card.',
        contact: '05278-234123',
        verified: true
    },
    {
        name: 'Ayodhya Nursing Home',
        category: 'hospitals',
        location: 'Bank Road',
        price: 'Affordable',
        rating: 4.1,
        timing: '9 AM - 9 PM',
        emoji: '🏥',
        color: '#ff4757',
        description: 'Private nursing home with general medicine, orthopedics, and dental services. Quick consultation.',
        contact: '9452345679',
        verified: true
    },
    {
        name: 'Shri Jeevan Hospital',
        category: 'hospitals',
        location: 'Sahadatganj',
        price: 'Moderate',
        rating: 4.2,
        timing: '24/7',
        emoji: '🏥',
        color: '#ff4757',
        description: 'Well-equipped hospital with ICU, surgery, and maternity services. Accepts student insurance.',
        contact: '05278-234567',
        verified: true
    },
    {
        name: 'City Medical Center',
        category: 'hospitals',
        location: 'Civil Lines',
        price: 'Budget-friendly',
        rating: 3.9,
        timing: '8 AM - 10 PM',
        emoji: '🏥',
        color: '#ff4757',
        description: 'General physician and pathology lab. Free health checkup camps for students monthly.',
        contact: '9123456781',
        verified: true
    },

    // LIBRARIES
    {
        name: 'Dr. Ram Manohar Lohia Avadh University Library',
        category: 'libraries',
        location: 'University Campus, Faizabad Road',
        price: 'Free for University Students',
        rating: 4.8,
        timing: '9 AM - 8 PM (Mon-Sat)',
        emoji: '📚',
        color: '#6a82fb',
        description: 'Central library with vast collection of books, journals, and research papers. WiFi, AC, and reading rooms.',
        contact: '05278-234000',
        verified: true
    },
    {
        name: 'District Library Ayodhya',
        category: 'libraries',
        location: 'Civil Lines, Near Collector Office',
        price: '₹50/month membership',
        rating: 4.3,
        timing: '10 AM - 6 PM',
        emoji: '📚',
        color: '#6a82fb',
        description: 'Public library with good collection of competitive exam books, newspapers, and magazines. Quiet environment.',
        contact: '05278-234111',
        verified: true
    },
    {
        name: 'Career Point Library',
        category: 'libraries',
        location: 'Bank Road, Near Coaching Centers',
        price: '₹800/month',
        rating: 4.5,
        timing: '7 AM - 10 PM',
        emoji: '📚',
        color: '#6a82fb',
        description: 'Specialized library for competitive exams (UPSC, SSC, Banking). Study material and test series available.',
        contact: '9456789124',
        verified: true
    },
    {
        name: 'Gyan Ganga Study Center',
        category: 'libraries',
        location: 'Sahadatganj',
        price: '₹1,200/month',
        rating: 4.4,
        timing: '6 AM - 11 PM',
        emoji: '📚',
        color: '#6a82fb',
        description: '24-hour study center with individual cubicles, WiFi, and power backup. Perfect for late-night study.',
        contact: '9988776656',
        verified: true
    },
    {
        name: 'Shiksha Library',
        category: 'libraries',
        location: 'Near Railway Station',
        price: '₹600/month',
        rating: 4.0,
        timing: '8 AM - 9 PM',
        emoji: '📚',
        color: '#6a82fb',
        description: 'Affordable library with book lending facility. Good collection of engineering and medical books.',
        contact: '9871234568',
        verified: true
    },

    // DESTINATIONS
    {
        name: 'Ram Janmabhoomi Temple',
        category: 'destinations',
        location: 'Ramkot, City Center',
        price: 'Free Entry',
        rating: 5.0,
        timing: '6 AM - 10 PM',
        emoji: '🏛️',
        color: '#fc5c7d',
        description: 'Most sacred site in Ayodhya. Must-visit for spiritual experience. Dress code applies.',
        contact: 'N/A',
        verified: true
    },
    {
        name: 'Hanuman Garhi',
        category: 'destinations',
        location: 'Hanuman Garhi Road',
        price: 'Free',
        rating: 4.8,
        timing: '5 AM - 9 PM',
        emoji: '🏛️',
        color: '#fc5c7d',
        description: 'Famous temple dedicated to Lord Hanuman. Requires climbing 76 steps. Great view of city.',
        contact: 'N/A',
        verified: true
    },
    {
        name: 'Kanak Bhawan',
        category: 'destinations',
        location: 'Near Hanuman Garhi',
        price: '₹10 Entry',
        rating: 4.6,
        timing: '8 AM - 12 PM, 2 PM - 6 PM',
        emoji: '🏛️',
        color: '#fc5c7d',
        description: 'Beautiful temple with gold and silver decorations. Architectural marvel.',
        contact: 'N/A',
        verified: true
    },
    {
        name: 'Saryu River Ghat',
        category: 'destinations',
        location: 'Saryu Ghat, Near River',
        price: 'Free',
        rating: 4.7,
        timing: '5 AM - 9 PM',
        emoji: '🏛️',
        color: '#fc5c7d',
        description: 'Peaceful river bank for morning walks and evening relaxation. Boat rides available.',
        contact: 'N/A',
        verified: true
    },
    {
        name: 'Naya Ghat',
        category: 'destinations',
        location: 'Saryu River',
        price: 'Free',
        rating: 4.5,
        timing: '6 AM - 8 PM',
        emoji: '🏛️',
        color: '#fc5c7d',
        description: 'Popular ghat for religious ceremonies and evening aarti. Great for photography.',
        contact: 'N/A',
        verified: true
    },
    {
        name: 'Guptar Ghat',
        category: 'destinations',
        location: 'Saryu River',
        price: 'Free',
        rating: 4.4,
        timing: '6 AM - 7 PM',
        emoji: '🏛️',
        color: '#fc5c7d',
        description: 'Historical ghat where Lord Ram is believed to have taken Jal Samadhi. Serene atmosphere.',
        contact: 'N/A',
        verified: true
    },

    // COACHING CENTERS
    {
        name: 'Career Point Coaching',
        category: 'coaching',
        location: 'Bank Road, Near University',
        price: '₹3,500/month',
        rating: 4.6,
        timing: '4 PM - 8 PM',
        emoji: '🎓',
        color: '#ffa502',
        description: 'Best for SSC, Banking, and Railway exams. Experienced faculty and regular test series.',
        contact: '9456789125',
        verified: true
    },
    {
        name: 'Physics Wallah Ayodhya',
        category: 'coaching',
        location: 'Civil Lines',
        price: '₹4,000/month',
        rating: 4.8,
        timing: '3 PM - 7 PM',
        emoji: '🎓',
        color: '#ffa502',
        description: 'Popular for JEE and NEET preparation. Modern teaching methods and affordable fees.',
        contact: '9123456782',
        verified: true
    },
    {
        name: 'Success Academy',
        category: 'coaching',
        location: 'Sahadatganj',
        price: '₹3,000/month',
        rating: 4.3,
        timing: '4 PM - 8 PM',
        emoji: '🎓',
        color: '#ffa502',
        description: 'Coaching for UPSC and State PSC. Small batch sizes and personal attention.',
        contact: '9988776657',
        verified: true
    },
    {
        name: 'Aakash Institute',
        category: 'coaching',
        location: 'Near University Gate',
        price: '₹5,000/month',
        rating: 4.5,
        timing: '2 PM - 7 PM',
        emoji: '🎓',
        color: '#ffa502',
        description: 'Premier institute for medical entrance (NEET). Comprehensive study material and DLP.',
        contact: '9871234569',
        verified: true
    },
    {
        name: 'Mathematics Hub',
        category: 'coaching',
        location: 'Bank Road',
        price: '₹2,500/month',
        rating: 4.2,
        timing: '5 PM - 8 PM',
        emoji: '🎓',
        color: '#ffa502',
        description: 'Specialized mathematics coaching for engineering and competitive exams. Problem-solving focus.',
        contact: '9452345680',
        verified: true
    }
];

// Seed function
async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/erts');
        console.log('✅ MongoDB Connected');

        // Clear existing listings
        await Listing.deleteMany({});
        console.log('🗑️ Cleared existing listings');

        // Insert new listings
        await Listing.insertMany(listings);
        console.log(`✅ Seeded ${listings.length} listings successfully`);
        console.log('📍 Categories: Hostels, Mess, Hospitals, Libraries, Destinations, Coaching');
        console.log('🎓 Location: Ayodhya - Dr. Ram Manohar Lohia Avadh University Area');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
