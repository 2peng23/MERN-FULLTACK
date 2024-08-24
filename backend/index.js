import express from "express";
import dotenv from "dotenv"; // It's common to import dotenv this way
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

import route from "./route.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ['Content-Type']
  })
);

const port = process.env.APP_PORT || 3000; // Provide a default port if APP_PORT is not defined

// Define routes and middleware before starting the server
app.use("/api", route);

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`The server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
