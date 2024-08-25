const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized!" });

  jwt.verify(token, process.env.JWT_SECRET_ACCESS, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

module.exports = checkToken;
