import { validationResult } from "express-validator";
import Ride from "../models/ride.model.js";
import {
  getFare,
  getOtp,
  confirmRide,
  startRide,
  endRide,
} from "../services/ride.service.js";
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

    ride.otp = "";

    const rideWithUser = await Ride.findOne({ _id: ride._id }).populate("user");

    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });

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

// const confirmRideController = async (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { rideId } = req.body;
//   try {
//     const ride = await confirmRide({rideId,captain:req.captain});

//     sendMessageToSocketId(ride.user.socketId,{
//       event:"ride-confirmed",
//       data:ride
//     })

//     return res.status(200).json(ride);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
const confirmRideController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, captainId } = req.body;

  try {
    // Log to check the incoming data
    console.log("Ride ID and Captain ID: ", rideId, captainId);

    const ride = await confirmRide({ rideId, captain: req.captain });

    // Send confirmation message via socket
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (error) {
    console.error("Error confirming ride: ", error);
    return res.status(500).json({ message: error.message });
  }
};

const startRideController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await startRide({ rideId, otp, captain: req.captain });

    console.log(ride);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const endRideController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await endRide({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export {
  createRide,
  getFareController,
  confirmRideController,
  startRideController,
  endRideController,
};
