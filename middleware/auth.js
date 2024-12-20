const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // User is authenticated, allow access to the protected area
    return next();
  }

  // If the user is not authenticated, redirect to GitHub authentication
  res.redirect('/auth/github'); // Redirect to GitHub login
};

module.exports = {
  isAuthenticated,
};
