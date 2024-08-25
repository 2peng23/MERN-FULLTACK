const userService = require("../Service/UserService");
const jwt = require("jsonwebtoken");

const createUser = (req, res) => {
  const body = req.body;
  userService.createUser(body, (err, response) => {
    if (err) {
      return res.status(500).json({
        success: 0,
        message: err,
        data: null,
      });
    }
    return res.status(200).json({
      success: 1,
      message: "User Created!",
      data: response,
    });
  });
};
const getUsers = (req, res) => {
  userService.getUsers((err, response) => {
    if (err) {
      return res.status(500).json({
        success: 0,
        message: err,
        data: null,
      });
    }
    return res.status(200).json({
      success: 1,
      message: "All Users",
      data: response,
    });
  });
};
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
      { name: response.name, email: response.email, id: response._id }, // Payload
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
          secure: false, // Not using HTTPS in local development
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

const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1 }).status(200).json({
      success: 1,
      message: "Logout Succefully!",
    });
  } catch (error) {
    console.log(error);
  }
};
const profile = (req, res) => {
  const jwtToken = req.cookies.token; // Get the token from the cookie
  console.log(jwtToken);

  if (jwtToken) {
    jwt.verify(jwtToken, process.env.JWT_SECRET_ACCESS, (err, user) => {
      if (err) {
        console.error("Token verification failed:", err);
        return res.json({
          success: 0,
          message: "Unauthorized: Invalid token",
          data: null,
        });
      }

      // `user` contains the decoded payload
      res.status(200).json({
        success: 1,
        data: user,
        token: jwtToken,
      });
    });
  } else {
    res.json({
      success: 0,
      message: "No token provided",
      data: null,
    });
  }
};

module.exports = userController = {
  createUser,
  getUsers,
  loginUser,
  profile,
  logout,
};
