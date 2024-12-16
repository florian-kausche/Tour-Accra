const express = require('express');
const router = express.Router();
const placesController = require('../controllers/places'); // Import the places controller
const { isAuthenticated } = require('../middleware/auth');

// Redirect to GitHub authentication
router.get('/login', (req, res) => {
    res.redirect('/auth/github');
});

// Define routes
router.get('/places', isAuthenticated, placesController.getAll); // Route to get all places
router.get('/places/:id', isAuthenticated, placesController.getSingle); // Route to get a single place by ID
router.post('/places', isAuthenticated, placesController.createPlace); // Corrected function name to 'createPlace' for consistency
router.put('/places/:id', isAuthenticated, placesController.updatePlace); // Fixed the typo in 'UpdatePlace' to 'updatePlace'
router.delete('/places/:id', isAuthenticated, placesController.deletePlace); // Corrected 'deletePlaces' to 'deletePlace' for singular consistency
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.redirect('/login.html'); // Redirect to login page after logout
    });
});

// Root route for testing
router.get('/', (req, res) => {
    res.send('/public/index');
});

// Export the router to use in the main application
module.exports = router;
