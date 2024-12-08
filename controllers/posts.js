// Import the local 'database' module for MongoDB connection.
const mongodb = require('../data/database');

// Import the 'ObjectId' class from the 'mongodb' module for handling MongoDB document IDs.
const ObjectId = require('mongodb').ObjectId;

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     responses:
 *       200:
 *         description: A list of posts
 */
const getAll = async (req, res) => {
    // Fetch all documents in the 'posts' collection.
    const result = await mongodb.getDatabase().collection('posts').find();
    // Convert the result to an array and send as JSON response.
    result.toArray().then((posts) => {
        res.setHeader('Content-Type', 'application/json'); // Set response type to JSON.
        res.status(200).json(posts); // Respond with status 200 and the posts.
    });
}

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved
 */
const getSingle = async (req, res) => {
    // Create a new ObjectId from the ID provided in the request parameters.
    const postId = new ObjectId(req.params.id);
    // Find a specific post by ID in the 'posts' collection.
    const result = await mongodb.getDatabase().collection('posts').find({ _id: postId });
    // Convert the result to an array and send the first post as a JSON response.
    result.toArray().then((posts) => {
        res.setHeader('Content-Type', 'application/json'); // Set response type to JSON.
        res.status(200).json(posts[0]); // Respond with status 200 and the single post.
        
    });
}

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
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
 *               dueDate:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               createdBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created
 */
const createPost = async (req, res) => {
    const post = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status,
        createdBy: req.body.createdBy
    };  

    try {
        const response = await mongodb.getDatabase().collection('posts').insertOne(post);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId, ...post });
        } else {
            res.status(500).json('Failed to create the post');
        }
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
};

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to update
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
 *               dueDate:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               createdBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 */
const UpdatePost = async (req, res) => {
    const postId = new ObjectId(req.params.id);

    const post = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status,
        createdBy: req.body.createdBy
    };  

    try {
        const response = await mongodb.getDatabase().collection('posts').updateOne(
            { _id: postId }, // Filter to find the post by ID
            { $set: post }   // Update operation
        );

        if (response.matchedCount > 0) {
            res.status(200).json(post);  // Respond with the updated post.
        } else {
            res.status(404).json('post not found');
        }
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
};

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Post deleted
 */
const deletePost = async (req, res) => {
    const postId = new ObjectId(req.params.id); // Create an ObjectId from the request parameter.

    try {
        const response = await mongodb.getDatabase().collection('posts').deleteOne({ _id: postId });
        if (response.deletedCount > 0) {
            res.status(204).send(); // Respond with status 204 (no content).
        } else {
            res.status(404).json('post has been deleted');
        }
    } catch (error) {
        res.status(500).json(`Error: ${error.message}`);
    }
};

// Export the functions so they can be used in other parts of the application.
module.exports = {
    getAll,
    getSingle,
    createPost,
    UpdatePost,
    deletePost
};
