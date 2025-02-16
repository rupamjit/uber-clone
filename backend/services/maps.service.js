import axios from "axios";

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

export { getAddressCoordinate };
