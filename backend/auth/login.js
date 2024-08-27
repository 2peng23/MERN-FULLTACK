const userService = require("../Service/UserService");
const jwt = require("jsonwebtoken");
const loginUser = (req, res) => {
  const data = req.body;
  userService.loginUser(data, (err, response) => {
    if (err) {
      return res.status(500).json({
        success: 0,
        message: err,
        data: null,
      });
    }

    // sign the JWT token
    jwt.sign(
      {
        name: response.name,
        email: response.email,
        id: response._id,
        role: response.user_role,
      }, // Payload
      process.env.JWT_SECRET_ACCESS, // Secret key
      { expiresIn: "1d" }, // 1 day
      (err, token) => {
        if (err) {
          return res.status(500).json({
            success: 0,
            message: "Token generation failed",
            data: null,
          });
        }

        // Set the cookie with a 1-day expiration time
        res.cookie("token", token, {
          httpOnly: true, // Prevents JavaScript access
          secure: true, // Not using HTTPS in local development
          maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
          path: "/", // Available site-wide
          sameSite: "Lax", // Adjust if needed
        });

        return res.status(200).json({
          success: 1,
          message: "Successfully Logged In!",
          data: response,
        });
      }
    );
  });
};
module.exports = loginUser;
