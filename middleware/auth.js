// Middleware to check if a user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If the user is authenticated, proceed to the next middleware or route handler
    return next();
  }

  // If the user is not authenticated, respond with a 401 status and a descriptive message
  res.status(401).json({ 
    success: false,
    message: "Access denied. You are not authenticated. Please sign in." 
  });
};

// Export the middleware to use in other parts of the application
module.exports = {
  isAuthenticated,
};

