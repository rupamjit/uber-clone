import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import BlackListToken from "../models/blackListToken.model.js";
import Captain from "../models/captain.model.js";

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorize" });
  }

  const isBlackListed = await BlackListToken.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const user = await User.findById(decoded.userId);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorize Token" });
  }
};

const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json("Unauthorize Token");
  }

  const isBlacklisted = await BlackListToken.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await Captain.findById(decoded.captainId);
    req.captain = captain;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorize Token" });
  }
};

export { authUser, authCaptain };
