import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const FinishRide = ({ setFinishedRidePanel,rideData }) => {
  // console.log(rideData)

  const navigate = useNavigate()

  const endRide = async() =>{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId:rideData._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }

    }

  return (
    <div>
      <h5
        onClick={() => setFinishedRidePanel(false)}
        className="p-1 text-center absolute w-[93%] top-0 "
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-3xl text-gray-600"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish This Ride</h3>

      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4 ">
        <div className="flex items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover "
            src="https://www.shutterstock.com/image-photo/handsome-indonesian-southeast-asian-man-260nw-2476654675.jpg"
            alt="user"
          />
          <h2 className="text-lg font-medium">{rideData?.user?.fullName?.firstName}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
          <i className="text-lg ri-map-pin-2-line"></i>
          <div>
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {rideData?.pickUp}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
          <i className="ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {rideData?.destination}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
          <i className="text-lg ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">${rideData?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full">
        <button
         
          onClick={endRide}
          className="w-full flex items-center justify-center mt-10 bg-green-600 text-white font-semibold p-2 rounded-lg"
        >
          Finish Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
