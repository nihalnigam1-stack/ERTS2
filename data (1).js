// ============================================================
//  data.js — Shared listings data for all ERTS category pages
// ============================================================

const listingsData = {

    hostels: [
        { name: "Shri Ram PG for Boys", location: "Near Ram Katha Park, Ayodhya", price: "₹4,500", unit: "/month", rating: 4.8, tag: "PG", tagColor: "#ff6b2c", emoji: "🏩", contact: "9876543210" },
        { name: "Janaki Girls Hostel", location: "Civil Lines, Ayodhya", price: "₹5,000", unit: "/month", rating: 4.6, tag: "Hostel", tagColor: "#ff6b2c", emoji: "🏠", contact: "9812345678" },
        { name: "Avadh Student PG", location: "Naya Ghat Road, Ayodhya", price: "₹3,800", unit: "/month", rating: 4.3, tag: "PG", tagColor: "#ff6b2c", emoji: "🏡", contact: "9898989898" },
        { name: "Ram Nagar Boys PG", location: "Ram Nagar Colony, Ayodhya", price: "₹4,200", unit: "/month", rating: 4.5, tag: "PG", tagColor: "#ff6b2c", emoji: "🏘", contact: "9011223344" },
        { name: "Sarayu Hostel", location: "Near Sarayu Ghat, Ayodhya", price: "₹5,500", unit: "/month", rating: 4.7, tag: "Hostel", tagColor: "#ff6b2c", emoji: "🏩", contact: "9191919191" },
        { name: "Valmiki Student Lodge", location: "Laxman Ghat Area, Ayodhya", price: "₹3,500", unit: "/month", rating: 4.2, tag: "PG", tagColor: "#ff6b2c", emoji: "🏠", contact: "9000000001" },
        { name: "Koshal PG Residency", location: "Faizabad Road, Ayodhya", price: "₹4,800", unit: "/month", rating: 4.6, tag: "PG", tagColor: "#ff6b2c", emoji: "🏡", contact: "9345678901" },
        { name: "Sita Sadan Girls Hostel", location: "Ramkot, Ayodhya", price: "₹4,000", unit: "/month", rating: 4.4, tag: "Hostel", tagColor: "#ff6b2c", emoji: "🏩", contact: "9456789012" },
        { name: "Bharath Boys Hostel", location: "Saket Colony, Ayodhya", price: "₹3,600", unit: "/month", rating: 4.1, tag: "Hostel", tagColor: "#ff6b2c", emoji: "🏘", contact: "9567890123" }
    ],

    mess: [
        { name: "Maa Annapurna Mess", location: "Civil Lines, Ayodhya", price: "₹2,200", unit: "/month", rating: 4.9, tag: "Veg Mess", tagColor: "#00c9a7", emoji: "🍛", contact: "9922334455" },
        { name: "Shyam Tiffin Centre", location: "Naya Ghat, Ayodhya", price: "₹1,800", unit: "/month", rating: 4.5, tag: "Tiffin", tagColor: "#00c9a7", emoji: "🥘", contact: "9033221100" },
        { name: "Gopal Bhojnalaya", location: "Ramkot, Ayodhya", price: "₹2,500", unit: "/month", rating: 4.7, tag: "Veg Mess", tagColor: "#00c9a7", emoji: "🍱", contact: "9887766554" },
        { name: "Avadhi Rasoi", location: "Hanuman Garhi Area, Ayodhya", price: "₹2,000", unit: "/month", rating: 4.6, tag: "Mess", tagColor: "#00c9a7", emoji: "🫕", contact: "9766554433" },
        { name: "Daily Tiffin Service", location: "Saket Colony, Ayodhya", price: "₹1,600", unit: "/month", rating: 4.4, tag: "Tiffin", tagColor: "#00c9a7", emoji: "🍽", contact: "9654433221" },
        { name: "Jai Shri Ram Dhaba", location: "Near University, Ayodhya", price: "₹40", unit: "/meal", rating: 4.8, tag: "Dhaba", tagColor: "#00c9a7", emoji: "🍲", contact: "9543322110" },
        { name: "Koshal Bhoj", location: "Ram Nagar Colony, Ayodhya", price: "₹1,900", unit: "/month", rating: 4.3, tag: "Mess", tagColor: "#00c9a7", emoji: "🍛", contact: "9432211009" },
        { name: "Sarayu Home Kitchen", location: "Sarayu Ghat, Ayodhya", price: "₹2,100", unit: "/month", rating: 4.5, tag: "Veg Mess", tagColor: "#00c9a7", emoji: "🥘", contact: "9321100998" },
        { name: "Student Dabba Service", location: "Civil Lines, Ayodhya", price: "₹1,500", unit: "/month", rating: 4.2, tag: "Tiffin", tagColor: "#00c9a7", emoji: "🍱", contact: "9210099887" }
    ],

    hospitals: [
        { name: "District Hospital Ayodhya", location: "Civil Lines, Ayodhya", price: "Free", unit: "Govt. OPD", rating: 4.5, tag: "Government", tagColor: "#f7b731", emoji: "🏥", contact: "05278-222601" },
        { name: "Ram Manohar Lohia Hospital", location: "Faizabad Road, Ayodhya", price: "24/7", unit: "Emergency", rating: 4.6, tag: "Government", tagColor: "#f7b731", emoji: "🏨", contact: "05278-230456" },
        { name: "Sarayu Medicare", location: "Naya Ghat, Ayodhya", price: "24/7", unit: "Private", rating: 4.7, tag: "Private", tagColor: "#f7b731", emoji: "🏥", contact: "9876001122" },
        { name: "Avadh Nursing Home", location: "Ramkot Area, Ayodhya", price: "₹200", unit: "Consult", rating: 4.4, tag: "Clinic", tagColor: "#f7b731", emoji: "🩺", contact: "9911002233" },
        { name: "Shri Hanuman Hospital", location: "Hanuman Garhi, Ayodhya", price: "24/7", unit: "Emergency", rating: 4.3, tag: "Private", tagColor: "#f7b731", emoji: "🏥", contact: "9800112233" },
        { name: "Primary Health Centre", location: "Saket Colony, Ayodhya", price: "Free", unit: "Govt. OPD", rating: 4.0, tag: "Government", tagColor: "#f7b731", emoji: "🏩", contact: "05278-244100" },
        { name: "Koshal Eye Hospital", location: "Civil Lines, Ayodhya", price: "₹300", unit: "Consult", rating: 4.5, tag: "Specialist", tagColor: "#f7b731", emoji: "👁", contact: "9700112233" },
        { name: "Ayodhya Dental Clinic", location: "Ram Nagar Colony, Ayodhya", price: "₹250", unit: "Consult", rating: 4.4, tag: "Clinic", tagColor: "#f7b731", emoji: "🦷", contact: "9600001122" },
        { name: "Laxman Trauma Centre", location: "Laxman Ghat, Ayodhya", price: "24/7", unit: "Emergency", rating: 4.8, tag: "Trauma", tagColor: "#f7b731", emoji: "🚑", contact: "9500112233" }
    ],

    destinations: [
        { name: "Ram Janmabhoomi Temple", location: "Ramkot, Ayodhya", price: "Free", unit: "Entry", rating: 5.0, tag: "Temple", tagColor: "#fc5c7d", emoji: "🏛️", contact: "Open 6AM-10PM" },
        { name: "Hanuman Garhi", location: "Near Naka Hanuman, Ayodhya", price: "Free", unit: "Entry", rating: 4.9, tag: "Temple", tagColor: "#fc5c7d", emoji: "⛩️", contact: "Open daily" },
        { name: "Sarayu Ghat", location: "Sarayu River Bank, Ayodhya", price: "Free", unit: "Entry", rating: 4.8, tag: "Ghat", tagColor: "#fc5c7d", emoji: "🌊", contact: "Open 24/7" },
        { name: "Kanak Bhawan", location: "Tulsighat Area, Ayodhya", price: "Free", unit: "Entry", rating: 4.7, tag: "Temple", tagColor: "#fc5c7d", emoji: "🕌", contact: "6AM – 9PM" },
        { name: "Ram ki Paidi", location: "Sarayu River, Ayodhya", price: "Free", unit: "Entry", rating: 4.8, tag: "Kund / Ghat", tagColor: "#fc5c7d", emoji: "🪔", contact: "Open daily" },
        { name: "Tulsi Smarak Bhawan", location: "Civil Lines, Ayodhya", price: "₹10", unit: "Entry", rating: 4.5, tag: "Museum", tagColor: "#fc5c7d", emoji: "🏛️", contact: "10AM – 5PM" },
        { name: "Nageshwarnath Temple", location: "Near Sarayu, Ayodhya", price: "Free", unit: "Entry", rating: 4.7, tag: "Temple", tagColor: "#fc5c7d", emoji: "🛕", contact: "5AM – 9PM" },
        { name: "Mani Parvat", location: "Near Faizabad Road, Ayodhya", price: "Free", unit: "Entry", rating: 4.4, tag: "Heritage", tagColor: "#fc5c7d", emoji: "⛰️", contact: "Open daily" },
        { name: "Dashrath Bhawan", location: "Ramkot, Ayodhya", price: "Free", unit: "Entry", rating: 4.6, tag: "Temple", tagColor: "#fc5c7d", emoji: "🏯", contact: "7AM – 8PM" }
    ],

    libraries: [
        { name: "Dr. RML Avadh University Library", location: "University Campus, Ayodhya", price: "Free", unit: "Students", rating: 4.7, tag: "University", tagColor: "#6a82fb", emoji: "📚", contact: "9AM – 6PM" },
        { name: "District Public Library", location: "Civil Lines, Ayodhya", price: "Free", unit: "Entry", rating: 4.5, tag: "Public", tagColor: "#6a82fb", emoji: "📖", contact: "10AM – 5PM" },
        { name: "Saraswati Gyan Mandir", location: "Naya Ghat, Ayodhya", price: "₹200", unit: "/month", rating: 4.6, tag: "Private", tagColor: "#6a82fb", emoji: "🏫", contact: "7AM – 10PM" },
        { name: "Avadh Study Centre", location: "Ramkot Area, Ayodhya", price: "₹300", unit: "/month", rating: 4.8, tag: "Study Hall", tagColor: "#6a82fb", emoji: "📝", contact: "6AM – 11PM" },
        { name: "Ram Katha Library", location: "Ram Katha Park, Ayodhya", price: "Free", unit: "Entry", rating: 4.4, tag: "Archive", tagColor: "#6a82fb", emoji: "🗂", contact: "9AM – 5PM" },
        { name: "Vivekananda Reading Room", location: "Saket Colony, Ayodhya", price: "₹150", unit: "/month", rating: 4.6, tag: "Reading Room", tagColor: "#6a82fb", emoji: "📚", contact: "7AM – 10PM" },
        { name: "Koshal Study Hub", location: "Ram Nagar Colony, Ayodhya", price: "₹250", unit: "/month", rating: 4.5, tag: "Study Hall", tagColor: "#6a82fb", emoji: "🖊", contact: "6AM – 11PM" },
        { name: "Digital Library Ayodhya", location: "Civil Lines, Ayodhya", price: "₹100", unit: "/month", rating: 4.7, tag: "Digital", tagColor: "#6a82fb", emoji: "💻", contact: "8AM – 10PM" },
        { name: "Sarayu Book Club", location: "Sarayu Ghat Area, Ayodhya", price: "Free", unit: "Entry", rating: 4.3, tag: "Public", tagColor: "#6a82fb", emoji: "📖", contact: "9AM – 6PM" }
    ]
};