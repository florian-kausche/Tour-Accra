const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, allow access to the protected area
  }
  // If not authenticated, redirect to the login page
  res.redirect('/places');
};

module.exports = {
  isAuthenticated
};
