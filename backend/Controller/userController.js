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



const profile = (req, res) => {
  const jwtToken = req.cookies.token; // Get the token from the cookie
  // console.log(jwtToken);

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
  profile,
};
