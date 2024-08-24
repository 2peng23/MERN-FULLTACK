import { User } from "../Models/UserModel.js";

const createUser = async (data, callBack) => {
  try {
    const user = await User.create(data);
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

export const userService = {
  createUser,
  getUsers,
};
