const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { getDatabase } = require('../data/database');
const { ObjectId } = require('mongodb');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = getDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const db = getDatabase();
      const usersCollection = db.collection('users');
      
      let user = await usersCollection.findOne({ githubId: profile.id });
      
      if (!user) {
        user = {
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value,
          createdAt: new Date()
        };
        
        const result = await usersCollection.insertOne(user);
        user._id = result.insertedId;
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

module.exports = passport;