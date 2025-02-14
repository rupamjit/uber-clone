// import { validationResult } from "express-validator";
// import User from "../models/user.model.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const registerUser = async (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     const { fullName, email, password } = req.body;
// console.log(req.body)

//     const isUser = await User.findOne({ email });

//     if (isUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = await User.create({
//       firstName: fullName.firstName,
//       lastName: fullName.lastName,
//       email,
//       password: hashedPassword,
//     });

//     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "24h",
//     });

//     res.status(201).json({ token, newUser });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server error" });
//   }
// };

// export { registerUser };



import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const errors = validationResult(req);
if (!errors.isEmpty()) {
  console.log("Validation Errors:", errors.array());
  return res.status(400).json({ errors: errors.array() });
}

  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password manually inside controller
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      fullName: {
        firstName: fullName.firstName,
        lastName: fullName.lastName,
      },
      email,
      password: hashedPassword,
    });

    // Generate JWT token inside controller
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ token, newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { registerUser };
