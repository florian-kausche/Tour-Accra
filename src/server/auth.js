import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const CALLBACK_URL = 'http://localhost:3001/auth/github/callback';

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Here you would typically:
      // 1. Check if user exists in your database
      // 2. If not, create new user
      // 3. Return user object
      
      const user = {
        githubId: profile.id,
        username: profile.username,
        email: profile._json.email
      };
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Auth routes
export const configureAuthRoutes = (app) => {
  app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
  );

  app.get('/auth/github/callback',
    passport.authenticate('github', { 
      failureRedirect: 'http://localhost:3000?error=auth_failed',
      successRedirect: 'http://localhost:3000'
    })
  );
}; 