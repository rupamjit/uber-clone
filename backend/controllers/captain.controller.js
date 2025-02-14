import { cookie, validationResult } from "express-validator";
import Captain from "../models/captain.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BlackListToken from "../models/blackListToken.model.js";

const registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;
    console.log("Received Request Body:", req.body);

    const existingUser = await Captain.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email id already exits" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newCaptain = await Captain.create({
      fullName: {
        firstName: fullName.firstName,
        lastName: fullName.lastName,
      },
      email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      },
    });
    console.log(newCaptain);
    const token = jwt.sign(
      { captainId: newCaptain._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({ token, newCaptain });
  } catch (error) {
    console.log(`Error in registering captain ${error}`);
  }
};

const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const captain = await Captain.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(400).json({ message: "Captain does not found" });
    }

    const comparedPassword = await bcrypt.compare(password, captain.password);

    if (!comparedPassword) {
      return res.status(400).json({ message: "Password does not found" });
    }

    const token = jwt.sign({ captainId: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token);

    res.status(201).json({ token, captain });
  } catch (error) {
    res.status(500).json(`Internal server error in logging captain ${error}`);
  }
};

const getCaptainProfile = (req, res) => {
  try {
    res.status(200).json(req.captain);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await BlackListToken.create({ token });

    res.clearCookie("token");

    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };
