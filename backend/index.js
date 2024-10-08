const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
require("./auth/passport.js");
const authRoute = require("./routes/authRoute.js");
const userRoute = require("./routes/userRoute.js");
const bookRoute = require("./routes/bookRoute.js");
const noteRoute = require("./routes/noteRoute.js");
const tagRoute = require("./routes/tagRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");
const checkToken = require("./auth/middleware/validation.js");
const noteContoller = require("./Controller/noteContoller.js");
const User = require("./Models/UserModel.js");

dotenv.config(); // Load environment variables

const app = express();

// Connection to the database
const port = process.env.PORT || 5555; // Provide a default port if APP_PORT is not defined
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`The server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Connection Error");
  });

const allowedOrigins = [
  "https://mern-fulltack-frontend.vercel.app",
  "http://localhost:5173",
];
// Connection to frontend
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
// Session middleware
app.use(
  session({
    secret: process.env.JWT_SECRET_ACCESS, // Replace with your secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true in production with HTTPS
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Define routes and middleware before starting the server
app.get("/", (req, res) => {
  res.json({
    success: 1,
    message: "Hello Zeniark! Please hire ME",
  });
});
app.get("/all-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      data: users,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", tagRoute);
app.use("/api", categoryRoute);
app.use("/api", checkToken, noteRoute);
app.use("/api", checkToken, bookRoute);
