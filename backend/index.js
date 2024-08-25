const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const route = require('./route.js');

dotenv.config(); // Load environment variables

const app = express();

// Connection to the database
const port = process.env.APP_PORT || 3000; // Provide a default port if APP_PORT is not defined
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log('Database Connected');
    app.listen(port, () => {
      console.log(`The server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Connection to frontend
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middlewares
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Define routes and middleware before starting the server
app.use('/api', route);
