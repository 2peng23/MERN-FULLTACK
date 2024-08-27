require("dotenv").config();
const passport = require("passport");
const User = require("../Models/UserModel");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const id = process.env.GOOGLE_OAUTH_CLIENT_ID;
const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const userService = require("../Service/UserService");
const jwt = require("jsonwebtoken");
const authHelper = require("../helpers/auth");
passport.use(
  new GoogleStrategy(
    {
      clientID: id,
      clientSecret: secret,
      callbackURL: "https://mern-fulltack-backend.vercel.app/api/auth/google/callback",
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
          try {
            const exist = await User.findOne({ email: userData.email });
            if (exist) {
              // Handle errors appropriately
              return done(null, false, { message: "Email already taken!" });
            }
            const hashedPassword = await authHelper.hashPassword(
              userData.password
            );
            user = await User.create({
              ...userData,
              password: hashedPassword,
            });
          } catch (error) {
            // Handle errors appropriately
            return done(error, false, {
              message: "An error occurred during authentication",
            });
          }
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
