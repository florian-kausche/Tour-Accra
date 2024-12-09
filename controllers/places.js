// Import the local 'database' module for MongoDB connection.
const mongodb = require('../data/database');

// Import the 'ObjectId' class from the 'mongodb' module for handling MongoDB document IDs.
const { ObjectId } = require('mongodb');

/**
 * @swagger
 * /places:
 *   get:
 *     summary: Retrieve all places
 *     responses:
 *       200:
 *         description: A list of places
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   location:
 *                     type: string
 *                   priority:
 *                     type: string
 *                   status:
 *                     type: string
 *                   createdBy:
 *                     type: string
 *                   addedDate:
 *                     type: string
 */
const getAll = async (req, res) => {
    // Fetch all documents in the 'places' collection from the database.
    const result = await mongodb.getDatabase().collection('places').find();
    // Convert the result to an array and send it as a JSON response.
    result.toArray().then((places) => {
        res.setHeader('Content-Type', 'application/json'); // Set the response header to indicate JSON content.
        res.status(200).json(places); // Respond with HTTP status 200 and the array of places.
    });
};

/**
 * @swagger
 * /places/{id}:
 *   get:
 *     summary: Retrieve a place by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the place to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Place retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 location:
 *                   type: string
 *                 priority:
 *                   type: string
 *                 status:
 *                   type: string
 *                 createdBy:
 *                   type: string
 *                 addedDate:
 *                   type: string
 */
const getSingle = async (req, res) => {
    // Create a new ObjectId from the ID provided in the request parameters.
    const placeId = new ObjectId(req.params.id);
    // Find a specific document in the 'places' collection using the ObjectId.
    const result = await mongodb.getDatabase().collection('places').find({ _id: placeId });
    // Convert the result to an array and return the first item (expected to be the place).
    result.toArray().then((places) => {
        res.setHeader('Content-Type', 'application/json'); // Set the response header to indicate JSON content.
        res.status(200).json(places[0]); // Respond with HTTP status 200 and the single place.
    });
};

/**
 * @swagger
 * /places:
 *   post:
 *     summary: Create a new place
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               addedDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Place created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 location:
 *                   type: string
 *                 priority:
 *                   type: string
 *                 status:
 *                   type: string
 *                 createdBy:
 *                   type: string
 *                 addedDate:
 *                   type: string
 */
const createPlace = async (req, res) => {
    // Extract place data from the request body.
    const place = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        priority: req.body.priority,
        status: req.body.status,
        createdBy: req.body.createdBy,
        addedDate: req.body.addedDate
    };

    try {
        // Insert the new place into the 'places' collection.
        const response = await mongodb.getDatabase().collection('places').insertOne(place);
        if (response.acknowledged) {
            // Respond with HTTP status 201 and the newly created place's details.
            res.status(201).json({ id: response.insertedId, ...place });
        } else {
            res.status(500).json('Failed to create the place'); // Handle failure to insert the place.
        }
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`); // Handle any errors during the insertion process.
    }
};

/**
 * @swagger
 * /places/{id}:
 *   put:
 *     summary: Update a place by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the place to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               addedDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Place updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 location:
 *                   type: string
 *                 priority:
 *                   type: string
 *                 status:
 *                   type: string
 *                 createdBy:
 *                   type: string
 *                 addedDate:
 *                   type: string
 */
const updatePlace = async (req, res) => {
    const placeId = req.params.id;

    // Validate the ObjectId format
    if (!ObjectId.isValid(placeId)) {
        return res.status(400).json({ error: 'Invalid ID format' }); // Return error if ID is invalid
    }

    // Create an ObjectId from the request parameter to identify the place to update.
    const objectId = new ObjectId(placeId);

    // Extract updated place data from the request body.
    const place = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        priority: req.body.priority,
        status: req.body.status,
        createdBy: req.body.createdBy,
        addedDate: req.body.addedDate
    };

    try {
        // Update the place in the 'places' collection with the new data.
        const response = await mongodb.getDatabase().collection('places').updateOne(
            { _id: objectId }, // Filter to find the place by its ID.
            { $set: place } // Update the specified fields with new data.
        );

        if (response.matchedCount > 0) {
            res.status(200).json(place); // Respond with HTTP status 200 and the updated place details.
        } else {
            res.status(404).json('Place not found'); // Handle case where the place wasn't found.
        }
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`); // Handle any errors during the update process.
    }
};

/**
 * @swagger
 * /places/{id}:
 *   delete:
 *     summary: Delete a place by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the place to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Place deleted
 */
const deletePlace = async (req, res) => {
    // Create an ObjectId from the request parameter to identify the place to delete.
    const placeId = new ObjectId(req.params.id);

    try {
        // Delete the place from the 'places' collection.
        const response = await mongodb.getDatabase().collection('places').deleteOne({ _id: placeId });
        if (response.deletedCount > 0) {
            res.status(204).send(); // Respond with HTTP status 204 (No Content) on successful deletion.
        } else {
            res.status(404).json('Place not found'); // Handle case where the place wasn't found.
        }
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`); // Handle any errors during the deletion process.
    }
};

// Export the CRUD functions so they can be used in other parts of the application.
module.exports = {
    getAll,
    getSingle,
    createPlace,
    updatePlace,
    deletePlace,
};
