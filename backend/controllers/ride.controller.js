import { validationResult } from "express-validator";
import Ride from "../models/ride.model.js";
import { getFare, getOtp } from "../services/ride.service.js";

const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const {  pickUp, destination, vehicleType } = req.body;
 
    const fare = await getFare(pickUp, destination);

    const ride = await  Ride.create({
      user:req.user._id,
      pickUp,
      destination,
      otp:getOtp(6),
      fare: fare[vehicleType],
    });

    return res.status(201).json({ride});
  } catch (error) {
    res.status(500).json("Internal Server Error", error.message);
  }
};
export  {createRide};
