import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";

import { query } from "express-validator";
import {
  getAutoCompleteSuggestions,
  getCoordinates,
  getDistanceAndTime,
} from "../controllers/map.controller.js";

const mapRouter = express.Router();

mapRouter.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 2 }),
  authUser,
  getCoordinates
);

mapRouter.get(
  "/get-distance-time",
  [
    query("origin").isString().isLength({ min: 2 }),
    query("destination").isString().isLength({ min: 2 }),
  ],
  authUser,
  getDistanceAndTime
);

mapRouter.get(
  "/get-distance-time",
  [
    query("origin").isString().isLength({ min: 2 }),
    query("destination").isString().isLength({ min: 2 }),
  ],
  authUser,
  getDistanceAndTime
);

mapRouter.get(
  "/get-suggetions",
  query("input").isString().isLength({ min: 2 }),
  authUser,
  getAutoCompleteSuggestions
);

export default mapRouter;
