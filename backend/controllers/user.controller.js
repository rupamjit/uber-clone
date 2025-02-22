import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import BlackListToken from "../models/blackListToken.model.js";

const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { fullName, email, password } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName: {
        firstName: fullName.firstName,
        lastName: fullName.lastName,
      },
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ token, newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password doenot match" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token);
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(`Error in login user${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfile = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const logOutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await BlackListToken.create({ token });
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};



export { registerUser, loginUser, getProfile, logOutUser };
