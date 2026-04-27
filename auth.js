// ============================================================
//  auth.js — Authentication & Database System (API Integration)
// ============================================================

const API_BASE_URL = 'http://localhost:5000/api';

const Auth = {
    // Check if user is logged in
    isLoggedIn() {
        return localStorage.getItem('erts_token') !== null;
    },

    // Get current user
    getCurrentUser() {
        const user = localStorage.getItem('erts_user');
        return user ? JSON.parse(user) : null;
    },

    // Get token
    getToken() {
        return localStorage.getItem('erts_token');
    },

    // Register/Login user (Simplified - just name and mobile)
    async register(name, mobile) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, mobile })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('erts_token', data.token);
                localStorage.setItem('erts_user', JSON.stringify(data.user));
                return { success: true, user: data.user, message: data.message };
            } else {
                return { success: false, message: data.message || 'Registration failed' };
            }
        } catch (error) {
            console.error('Register Error:', error);
            return { success: false, message: 'Server error. Please make sure the backend is running on port 5000.' };
        }
    },

    // Logout user
    logout() {
        localStorage.removeItem('erts_token');
        localStorage.removeItem('erts_user');
        window.location.href = 'login.html';
    },

    // Update user profile
    async updateProfile(profileData) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: JSON.stringify(profileData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('erts_user', JSON.stringify(data.user));
                return { success: true, user: data.user };
            } else {
                return { success: false, message: data.message || 'Update failed' };
            }
        } catch (error) {
            console.error('Update Profile Error:', error);
            return { success: false, message: 'Server error. Please try again.' };
        }
    },

    // Save listing to user's favorites
    async saveListing(listing) {
        if (!this.isLoggedIn()) return { success: false, message: 'Please login first' };

        try {
            const response = await fetch(`${API_BASE_URL}/users/save-listing`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: JSON.stringify({ listing })
            });

            const data = await response.json();

            if (response.ok) {
                // Update local user data
                const user = this.getCurrentUser();
                user.savedListings = data.savedListings;
                localStorage.setItem('erts_user', JSON.stringify(user));
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message || 'Failed to save' };
            }
        } catch (error) {
            console.error('Save Listing Error:', error);
            return { success: false, message: 'Server error. Please try again.' };
        }
    },

    // Remove listing from favorites
    async removeListing(listingName) {
        if (!this.isLoggedIn()) return { success: false, message: 'Please login first' };

        try {
            const response = await fetch(`${API_BASE_URL}/users/save-listing/${encodeURIComponent(listingName)}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Update local user data
                const user = this.getCurrentUser();
                user.savedListings = data.savedListings;
                localStorage.setItem('erts_user', JSON.stringify(user));
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message || 'Failed to remove' };
            }
        } catch (error) {
            console.error('Remove Listing Error:', error);
            return { success: false, message: 'Server error. Please try again.' };
        }
    },

    // Get user's saved listings
    async getSavedListings() {
        if (!this.isLoggedIn()) return [];

        try {
            const response = await fetch(`${API_BASE_URL}/users/saved-listings`, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });

            if (response.ok) {
                const listings = await response.json();
                // Update local cache
                const user = this.getCurrentUser();
                user.savedListings = listings;
                localStorage.setItem('erts_user', JSON.stringify(user));
                return listings;
            }
            return [];
        } catch (error) {
            console.error('Get Saved Listings Error:', error);
            return this.getCurrentUser()?.savedListings || [];
        }
    },

    // Check authentication and redirect if not logged in
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
};

// No authentication guard - students get direct access
// All pages are now public
