import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BlackListToken from "../models/blackListToken.model.js";

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
    console.log(decoded);
    const user = await User.findById(decoded.userId);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorize Token" });
  }
};

export default authUser;
