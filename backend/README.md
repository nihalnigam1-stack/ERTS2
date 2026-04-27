# ERTS Backend API

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/erts
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

4. Start MongoDB (if not already running):
```bash
# On Windows
mongod

# On Mac/Linux
sudo systemctl start mongodb
# or
mongod
```

5. Start the server:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update user profile (requires auth)
- `POST /api/users/save-listing` - Save a listing (requires auth)
- `DELETE /api/users/save-listing/:name` - Remove saved listing (requires auth)
- `GET /api/users/saved-listings` - Get saved listings (requires auth)

### Listings
- `GET /api/listings` - Get all listings (optional: ?category=hostels)
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

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Database Schema

### User
- firstName, lastName, email, password, college
- savedListings (array)
- dashboardData (expenses, tasks)

### Listing
- name, category, location, price, rating, timing, emoji, color, description, contact, verified
