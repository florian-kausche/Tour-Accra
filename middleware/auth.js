function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login');
}

module.exports = { isAuthenticated };
