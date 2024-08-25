const { Router } = require("express");
const google = require("../auth/googleAuth");
const loginUser = require("../auth/login");
const logout = require("../auth/logout");
const authRoute = Router();
// auth Routes
authRoute.post("/user/login", loginUser);
authRoute.post("/user/logout", logout);
authRoute.get("/auth/google", google.googleAuth);
authRoute.get("/auth/google/callback", google.googleCallBack);

module.exports = authRoute;
