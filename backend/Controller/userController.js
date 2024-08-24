import { userService } from "../Service/UserService.js";
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

export const userController = {
  createUser,
  getUsers,
};
