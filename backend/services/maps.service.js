import axios from "axios";
import Captain from "../models/captain.model.js";

const getAddressCoordinate = async (address) => {
  const API_KEY = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    // console.log(response.data);
    if (response.data.status === "OK") {
      const { lat, lng } = response.data.results[0].geometry.location;
      // console.log(lat,lng);
      return { lat, lng };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and Destination are required");
  }

  const API_KEY = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    // console.log(response.data.rows);
    if (response.data.status === "OK") {
      console.log(response.data.rows[0].elements[0]);
      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Failed to get distance and time");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const autoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Query is Required!!!");
  }
  const API_KEY = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      console.log(response.data.predictions);
      return response.data.predictions;
    } else {
      throw new Error("Unable To Fetch Data");
    }
  } catch (error) {
    console.log(error);
    throw err;
  }
};


const getCaptainInTheRadius = async (ltd, lng, radius) => {

  const captains = await Captain.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371], 
      },
    },
  });

  return captains;
};

export { getAddressCoordinate, getDistanceTime, autoCompleteSuggestions,getCaptainInTheRadius };
