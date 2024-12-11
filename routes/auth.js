const express = require('express');
const passport = require('passport');
const router = express.Router();

// GitHub authentication route
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub callback route
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/places');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Check authentication status
router.get('/status', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  });
});

module.exports = router;