import express from "express";
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("Firstname must be atleast 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  registerUser
);




export default userRouter;
