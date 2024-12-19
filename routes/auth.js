// const express = require('express');
// const passport = require('passport');
// const { getDatabase } = require('../data/database');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const Joi = require('joi');


// // GitHub authentication route
// router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// // GitHub callback route
// router.get('/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   async (req, res) => {
//     const db = getDatabase();
//     const usersCollection = db.collection('users');

//     // Check if the user already exists
//     let user = await usersCollection.findOne({ githubId: req.user.githubId });
//     if (!user) {
//       // Create new user if not exists
//       user = {
//         githubId: req.user.githubId,
//         username: req.user.username,
//         displayName: req.user.displayName,
//         email: req.user.email,
//         createdAt: new Date()
//       };
//       await usersCollection.insertOne(user);
//     }

//     // Log the user in
//     req.login(user, (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Login failed' });
//       }
//       res.redirect('/places'); // Redirect to the places page after successful registration/login
//     });
//   }
// );

// // Logout route
// router.get('/logout', (req, res) => {
//   req.logout(() => {
//     res.redirect('/login.html');
//   });
// });

// // Check authentication status
// router.get('/status', (req, res) => {
//   res.json({
//     isAuthenticated: req.isAuthenticated(),
//     user: req.user
//   });
// });

// const registerSchema = Joi.object({
//     username: Joi.string().min(3).required(),
//     password: Joi.string().min(6).required(),
// });

// router.post('/register', async (req, res) => {
//   // Check if the user is authenticated via GitHub
//   if (!req.isAuthenticated()) {
//       return res.status(401).json({ message: 'User must be authenticated via GitHub to register.' });
//   }

//   const { username, password } = req.body;

//   // Continue with the registration logic
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const db = getDatabase();
//   const usersCollection = db.collection('users');

//   // Check if user already exists
//   const existingUser = await usersCollection.findOne({ username });
//   if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//   }

//   // Create new user
//   const newUser = {
//       username,
//       password: hashedPassword,
//       createdAt: new Date(),
//   };

//   await usersCollection.insertOne(newUser);
//   res.status(201).json({ message: 'User registered successfully' });

// });

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/login.html',
//     failureRedirect: '/login.html',
// }));

// module.exports = router;