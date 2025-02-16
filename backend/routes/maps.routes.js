import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";

import { query } from "express-validator";
import { getCoordinates } from "../controllers/map.controller.js";

const mapRouter = express.Router();

mapRouter.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 2 }),
  authUser,
  getCoordinates
);



export default mapRouter;
