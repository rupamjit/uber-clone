import { validationResult } from "express-validator";
import {
    autoCompleteSuggestions,
  getAddressCoordinate,
  getDistanceTime,
} from "../services/maps.service.js";

const getCoordinates = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ errors: erros.array() });
  }

  const { address } = req.query;
  try {
    const coordinates = getAddressCoordinate(address);
    // console.log("Coordinates:", coordinates);
    res.status(200).json({ coordinates });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal Server Error" });
  }
};

const getDistanceAndTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { origin, destination } = req.query;

    const distanceAndTime = await getDistanceTime(origin, destination);

    console.log("Distance and Time:", distanceAndTime);

    res.status(200).json({ distanceAndTime });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal Server Error" });
  }
};

const getAutoCompleteSuggestions = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(404).json({ errors: errors.array() });
  }

  try {

    const {input} = req.query;

    const suggetions = await autoCompleteSuggestions(input)

    res.status(200).json({suggetions})


  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal Server Error" });
  }
};

export { getCoordinates, getDistanceAndTime, getAutoCompleteSuggestions };
