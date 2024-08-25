const User = require("../Models/UserModel");
const authHelper = require("../helpers/auth");

const createUser = async (data, callBack) => {
  try {
    const exist = await User.findOne({ email: data.email });
    if (exist) {
      return callBack("Email already taken!");
    }
    const hashedPassword = await authHelper.hashPassword(data.password);
    const user = await User.create({
      ...data,
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    return callBack(null, user);
  } catch (error) {
    callBack(error);
  }
};
const getUsers = async (callBack) => {
  try {
    const user = await User.find();
    return callBack(null, user);
  } catch (error) {
    callBack(error);
  }
};
const loginUser = async (data, callBack) => {
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return callBack("Invalid Credentials");
    }
    // const hashedPassword = await authHelper.hashPassword(data.password);
    const isMatch = await authHelper.comparePassword(
      data.password, //password from client-side
      user.password, //password from db
    );
    if (!isMatch) {
      return callBack("Invalid Credentials");
    }
    return callBack(null, user);
  } catch (error) {
    callBack(error);
  }
};
const updateUser = async (access_token, refresh_token, user_id, callBack) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: user_id }, // Query to find the user
      {
        $set: {
          access_token: access_token,
          refresh_token: refresh_token,
        },
      }, // Update operation
      { new: true } // Return the updated document
    );

    callBack(null, user); // Pass the updated user to the callback
  } catch (error) {
    callBack(error); // Pass any error to the callback
  }
};

module.exports = userService = {
  createUser,
  getUsers,
  loginUser,
  updateUser,
};
