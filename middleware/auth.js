const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('places');

router.get('/protected', isAuthenticated, (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: "Welcome to the protected route!" 
  });
});

module.exports = router;
