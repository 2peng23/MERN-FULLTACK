const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 1 }).status(200).json({
      success: 1,
      message: "Logout Succefully!",
    });
  } catch (error) {
    res.json({
      success: 0,
      message: error,
    });
  }
};
module.exports = logout;
