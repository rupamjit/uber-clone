import { validationResult } from "express-validator";
import { getAddressCoordinate } from "../services/maps.service.js";


const getCoordinates = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ errors: erros.array() });
  }

  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinate(address);
    // console.log("Coordinates:", coordinates);
    res.status(200).json({coordinates});
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal Server Error" });
  }
};

export { getCoordinates };
