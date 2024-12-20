const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, allow access
  }
  
  // Send a message to unauthenticated users
  res.status(401).json({ message: "You are not authenticated. Please sign in." });
};

module.exports = {
  isAuthenticated,
};
 // Render an HTML page with a message
 