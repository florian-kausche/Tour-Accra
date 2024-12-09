const express = require('express');
const router = express.Router();
const placesController = require('../controllers/places'); // Import the places controller

// Define routes
router.get('/places', placesController.getAll); // Route to get all places
router.get('/places/:id', placesController.getSingle); // Route to get a single place by ID
router.post('/places', placesController.createPlace); // Corrected function name to 'createPlace' for consistency
router.put('/places/:id', placesController.updatePlace); // Fixed the typo in 'UpdatePlace' to 'updatePlace'
router.delete('/places/:id', placesController.deletePlace); // Corrected 'deletePlaces' to 'deletePlace' for singular consistency

// Root route for testing
router.get('/', (req, res) => {
    res.send("Welcome To Accra");
});

// Export the router to use in the main application
module.exports = router;
