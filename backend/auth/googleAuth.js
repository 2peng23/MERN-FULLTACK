const passport = require("passport");
const jwt = require("jsonwebtoken");

const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});
const googleCallBack = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      return next(err); // Handle authentication errors
    }
    if (!user) {
      return res.redirect("http://localhost:5173/login"); // Handle authentication failure
    }

    // Generate JWT token
    const token = jwt.sign(
      { name: user.name, email: user.email, id: user._id }, // Payload
      process.env.JWT_SECRET_ACCESS, // Secret key
      { expiresIn: "1d" } // 1 day
    );

    // Set the cookie with a 1-day expiration time
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access
      secure: false, // Not using HTTPS in local development
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
      path: "/", // Available site-wide
      sameSite: "Lax", // Adjust if needed
    });

    // Redirect to your frontend or any other route
    res.redirect("http://localhost:5173/dashboard");
  })(req, res, next);
};

module.exports = google = {
  googleAuth,
  googleCallBack,
};
