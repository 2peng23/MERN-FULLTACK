const passport = require("passport");
const jwt = require("jsonwebtoken");

// Google Authentication
const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});

// Google Callback
const googleCallBack = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      return next(err); // Handle authentication errors
    }
    if (!user) {
      return res.redirect("https://mern-fulltack-frontend.vercel.app/login"); // Handle authentication failure
    }

    // Generate JWT token
    const token = jwt.sign(
      { name: user.name, email: user.email, id: user._id, role: user.user_role }, // Payload
      process.env.JWT_SECRET_ACCESS, // Secret key
      { expiresIn: "1d" } // 1 day
    );

    // Set the cookie with a 1-day expiration time
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === "production", // Only secure in production
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
      path: "/", // Available site-wide
      sameSite: "Lax", // Adjust if needed
    });

    // Redirect to your frontend or any other route
    res.redirect("https://mern-fulltack-frontend.vercel.app/dashboard");
  })(req, res, next);
};

// Export the module
module.exports = {
  googleAuth,
  googleCallBack,
};
