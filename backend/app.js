import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import captainRouter from "./routes/captain.routes.js";
import mapRouter from "./routes/maps.routes.js";
import rideRouter from "./routes/ride.routes.js";

const app = express();


connectDB();

// CORS Configuration
const allowedOrigins = [
  "https://uber-git-main-rupamjit-ghoshs-projects.vercel.app", 
];



app.use(
  cors({
    origin: allowedOrigins, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/captains", captainRouter);
app.use("/api/v1/maps", mapRouter);
app.use("/api/v1/rides", rideRouter);

export default app;