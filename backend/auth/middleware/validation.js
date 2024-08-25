const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  // get the header or in cookies
  //sample with header  req.headers["authorization"]?.split(" ")[1]
  const token =  req.cookies.token;
  // check if there is token sent
  if (!token) return res.status(401).json({ message: "Unauthorized!" });

  // validate the token
  jwt.verify(token, process.env.JWT_SECRET_ACCESS, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

module.exports = checkToken;
