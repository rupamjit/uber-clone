import express from "express";
import { body } from "express-validator";
import { getProfile, loginUser, logOutUser, registerUser } from "../controllers/user.controller.js";
import authUser from "../middlewares/auth.middleware.js";

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

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
  ],
  loginUser
);


userRouter.get("/profile",authUser,getProfile)
userRouter.get("/logout",authUser,logOutUser)



export default userRouter;
