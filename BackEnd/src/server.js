import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();


console.log(process.env.MONGO_URI);
//const express = require("express");


const app = express();
const PORT = process.env.PORT || 5001;


// app.use(cors({
//   origin: 'http://localhost:5173',
//   //methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization", 'Access-Control-Allow-Origin'],
//   requestHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
// }));

// app.use((req, res, next) => {
//  console.log(req.path, req.method);
//   next();
// });a
app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
  requestHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'], 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());//to parse the request body
app.use(rateLimiter);//to limit the number of requests
app.use("/api/notes", notesRoutes);//to use the notesRoutes


connectDB().then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
}); 




