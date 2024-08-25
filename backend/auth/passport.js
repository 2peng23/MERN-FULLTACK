require("dotenv").config();
const passport = require("passport");
const User = require("../Models/UserModel");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const id = process.env.GOOGLE_OAUTH_CLIENT_ID;
const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const userService = require("../Service/UserService");
const jwt = require("jsonwebtoken");
passport.use(
  new GoogleStrategy(
    {
      clientID: id,
      clientSecret: secret,
      callbackURL: "http://localhost:5555/api/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists
        let user = await User.findOne({ email: profile.email });

        // If the user doesn't exist, create a new one
        if (!user) {
          const userData = {
            name: profile.displayName,
            email: profile.email,
            password: profile.displayName, // Consider hashing the password or using a secure method
          };
          user = await userService.createUser(userData, null);
        }
        // Pass the user to the done callback
        return done(null, user);
      } catch (err) {
        // Handle errors appropriately
        return done(err, false, {
          message: "An error occurred during authentication",
        });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize user ID or relevant information
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Retrieve user by ID or relevant information
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });

  // For now, just return the user ID
  done(null, { id });
});
