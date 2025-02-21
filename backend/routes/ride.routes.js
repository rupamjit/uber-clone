import express from "express";
import { body, query } from "express-validator";
import {
  createRide,
  getFareController,
  confirmRideController,
  startRideController
} from "../controllers/ride.controller.js";
import { authCaptain, authUser } from "../middlewares/auth.middleware.js";

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
      .isIn(["auto", "moto", "car"])
      .withMessage("Invalid Vehicle Type"),
  ],
  createRide
);

rideRouter.get(
  "/get-fare",
  authUser,
  [
    query("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invlaid pickup address"),
    query("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invlaid pickup destination"),
  ],
  getFareController
);

rideRouter.post(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid pikup address"),
  confirmRideController
);

rideRouter.get("/start-ride", authCaptain,
  query('rideId').isMongoId().withMessage('Invalid ride id'),
  query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
  startRideController
)

export default rideRouter;
