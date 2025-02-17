import express from "express";
import { body } from "express-validator";
import { createRide } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const rideRouter = express.Router();

rideRouter.post(
  "/create",
  authUser,
  [
    body("pickUp")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invlaid pickup address"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invlaid pickup destination"),
    body("vehicleType")
      .isString()
      .isIn(["auto", "motorcycle", "car"])
      .withMessage("Invalid Vehicle Type"),
  ],
  createRide
);

export default rideRouter;
