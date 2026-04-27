# ERTS - Setup Instructions

## Prerequisites

Before running the ERTS application, you need to install the following:

### 1. MongoDB (Database)
- Download and install MongoDB Community Server from: https://www.mongodb.com/try/download/community
- During installation, choose "Complete" setup
- Make sure MongoDB is running after installation
- MongoDB will run on port 27017 by default

### 2. Node.js (Backend Runtime)
- Download and install Node.js from: https://nodejs.org/
- Version 14 or higher is recommended
- Node.js includes npm (package manager)

## Setup Steps

### Step 1: Start MongoDB

**Windows:**
- Open Command Prompt as Administrator
- Run: `mongod`
- Keep this window open (MongoDB must be running)

**Or install MongoDB as Windows Service:**
- During MongoDB installation, select "Install MongoDB as a Service"
- MongoDB will start automatically when Windows starts

**Verify MongoDB is running:**
- Open browser and go to: http://localhost:27017
- You should see: "It looks like you are trying to access MongoDB over HTTP on the native driver port."

### Step 2: Install Backend Dependencies

1. Open terminal/command prompt
2. Navigate to backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

This will install:
- express (web framework)
- mongoose (MongoDB ODM)
- cors (cross-origin resource sharing)
- dotenv (environment variables)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- express-validator (input validation)

### Step 3: Seed Database with Ayodhya Data

1. Make sure MongoDB is running
2. From the backend directory, run:
   ```bash
   node seed.js
   ```

This will populate the database with:
- 6 Hostels & PGs
- 5 Mess & Tiffins
- 5 Hospitals
- 5 Libraries
- 6 Destinations
- 5 Coaching Centers

All data is specific to Ayodhya for university students.

### Step 4: Start Backend Server

1. From the backend directory, run:
   ```bash
   npm start
   ```

Or for development with auto-restart:
   ```bash
   npm run dev
   ```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
📍 API URL: http://localhost:5000
📍 Frontend should connect to: http://localhost:5000/api
```

### Step 5: Open Frontend

1. Open `login.html` in your browser
2. You can use Live Server in VS Code or simply double-click the file
3. The frontend will connect to the backend at `http://localhost:5000/api`

## Testing the Application

### Register a New Account

1. Open `login.html` in browser
2. Click "Register" tab
3. Fill in the form:
   - First Name: e.g., Rahul
   - Last Name: e.g., Sharma
   - Email: e.g., rahul@example.com
   - College: e.g., Dr. Ram Manohar Lohia Avadh University
   - Password: (minimum 6 characters)
   - Confirm Password: (must match)
4. Click "Create Account"
5. You should see: "✅ Registration successful! Redirecting to dashboard..."
6. You will be automatically redirected to `dashboard.html`

### Login

1. If you're already logged out, open `login.html`
2. Fill in:
   - Email: your registered email
   - Password: your password
3. Click "Login"
4. You will be redirected to `dashboard.html`

### Access Protected Pages

After login, you can access:
- `ERTS.html` - Homepage
- `resources.html` - Study Resources
- `living.html` - Hostels, Mess, Destinations
- `services.html` - Hospitals, Libraries, Coaching
- `opportunities.html` - Internships, Jobs, Alerts
- `tools.html` - Budget Planner, Recommendations
- `dashboard.html` - Your personal dashboard

All pages require login. If you try to access without login, you'll be redirected to `login.html`.

## Troubleshooting

### MongoDB Connection Error

**Error:** "MongoDB Connection Error"
**Solution:**
- Make sure MongoDB is running: `mongod`
- Check if MongoDB is installed correctly
- Verify MongoDB is on port 27017

### Backend Not Starting

**Error:** "Server error. Please make sure the backend is running on port 5000"
**Solution:**
- Make sure you ran `npm install` in the backend directory
- Check if port 5000 is already in use
- Run `npm start` in the backend directory

### Registration/Login Not Working

**Error:** "Server error"
**Solution:**
- Make sure backend server is running
- Check browser console (F12) for errors
- Verify MongoDB is connected
- Check that backend is on port 5000

### CORS Error

**Error:** "CORS policy" or "Access-Control-Allow-Origin"
**Solution:**
- This is already handled in the backend
- Make sure backend is running before opening frontend

## Database Schema

### User Collection
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  college: String,
  savedListings: Array,
  dashboardData: {
    expenses: Array,
    tasks: Array
  },
  createdAt: Date
}
```

### Listing Collection
```javascript
{
  name: String,
  category: String (hostels, mess, hospitals, libraries, destinations, coaching),
  location: String,
  price: String,
  rating: Number,
  timing: String,
  emoji: String,
  color: String,
  description: String,
  contact: String,
  verified: Boolean,
  createdAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update user profile (requires auth)
- `POST /api/users/save-listing` - Save listing (requires auth)
- `DELETE /api/users/save-listing/:name` - Remove saved listing (requires auth)
- `GET /api/users/saved-listings` - Get saved listings (requires auth)

### Listings
- `GET /api/listings` - Get all listings
- `GET /api/listings?category=hostels` - Get listings by category
- `GET /api/listings/:id` - Get listing by ID
- `POST /api/listings` - Create new listing
- `PUT /api/listings/:id` - Update listing
- `DELETE /api/listings/:id` - Delete listing

### Dashboard
- `GET /api/dashboard/` - Get dashboard data (requires auth)
- `POST /api/dashboard/expense` - Add expense (requires auth)
- `DELETE /api/dashboard/expense/:id` - Delete expense (requires auth)
- `POST /api/dashboard/task` - Add task (requires auth)
- `PUT /api/dashboard/task/:id` - Toggle task completion (requires auth)
- `DELETE /api/dashboard/task/:id` - Delete task (requires auth)

## Security Notes

- Passwords are hashed using bcryptjs before storing in database
- JWT tokens are used for authentication
- Tokens expire after 7 days
- All protected routes require valid JWT token
- CORS is configured to allow requests from frontend

## Development

### Backend Structure
```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables
├── seed.js               # Database seed script
├── models/
│   ├── User.js           # User schema
│   └── Listing.js        # Listing schema
├── routes/
│   ├── auth.js           # Auth routes
│   ├── users.js          # User routes
│   ├── listings.js       # Listing routes
│   └── dashboard.js      # Dashboard routes
└── middleware/
    └── auth.js           # JWT authentication middleware
```

### Frontend Structure
```
ERTSproject/
├── ERTS.html             # Homepage
├── login.html            # Login/Register page
├── dashboard.html        # User dashboard
├── resources.html         # Resources page
├── living.html           # Living page
├── services.html         # Services page
├── opportunities.html    # Opportunities page
├── tools.html            # Tools page
├── auth.js               # Authentication logic
├── script.js             # Shared JavaScript
├── data.js               # Static data (fallback)
└── ERTS.css              # Styles
```

## Support

If you encounter any issues:
1. Check that MongoDB is running
2. Check that backend server is running on port 5000
3. Check browser console for errors
4. Verify all dependencies are installed
5. Make sure you're using the correct API URL in auth.js
