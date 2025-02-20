import { validationResult } from "express-validator";
import Ride from "../models/ride.model.js";
import { getFare, getOtp } from "../services/ride.service.js";
import {
  getAddressCoordinate,
  getCaptainInTheRadius,
} from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";


const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const { pickUp, destination, vehicleType } = req.body;

    const fare = await getFare(pickUp, destination);

    const pickUpCoordinates = await getAddressCoordinate(pickUp);

    const captainsInRadius = await getCaptainInTheRadius(
      pickUpCoordinates.lat,
      pickUpCoordinates.lng,
      20
    );

  

    // console.log(captainsInRadius);

    const ride = await Ride.create({
      user: req.user._id,
      pickUp,
      destination,
      otp: getOtp(6),
      fare: fare[vehicleType],
    });

    ride.otp = ""

    const rideWithUser = await Ride.findOne({_id:ride._id}).populate('user')

    captainsInRadius.map(captain=>{
      sendMessageToSocketId(captain.socketId,{
        event:"new-ride",
        data:  rideWithUser
      })
    })



    return res.status(201).json({ ride });
  } catch (error) {
    res.status(500).json({ "Internal Server Error": error.message });
  }
};

const getFareController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickup, destination } = req.query;

    const fare = await getFare(pickup, destination);
    // console.log(fare)
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ "Internal Server Error": error.message });
  }
};
export { createRide, getFareController };
