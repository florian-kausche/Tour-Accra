const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.userStatus = 'authenticated'; // Mark the user as authenticated
    return next(); // Proceed to the next middleware or route handler
  } else {
    req.userStatus = 'not_authenticated'; // Mark the user as not authenticated
    res.locals.user = null; // Optional: Set a user object for unauthenticated access
  }

  // Allow unauthenticated users to proceed, but with limited access
  return next();
};

// Example protected route with differentiated behavior
const protectedRouteHandler = (req, res) => {
  if (req.userStatus === 'authenticated') {
    // Provide full access to authenticated users
    res.status(200).json({
      message: 'Welcome to the protected area!',
      user: req.user, // Access the authenticated user object
    });
  } else {
    // Provide limited access or inform the user they are unauthenticated
    res.status(401).json({
      message: 'You are not authenticated, limited access only.',
    });
  }
};

module.exports = {
  isAuthenticated,
  protectedRouteHandler,
};
