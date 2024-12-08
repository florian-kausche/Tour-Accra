const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');


// Define routes
router.get('/posts', postsController.getAll);
router.get('/posts/:id', postsController.getSingle);
router.post('/posts', postsController.createPost);
router.put('/posts/:id', postsController. UpdatePost);
router.delete('/posts/:id', postsController.deletePost);

router.get('/', (req, res) => {
    res.send('Hello World its me, Florian');
});

// router.use('/posts', require('./posts')); // Load 'posts' routes

module.exports = router;
