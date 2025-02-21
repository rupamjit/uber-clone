import { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = ({ setConfirmRidePopupPanel, setRidePopUpPanel,ride }) => {

  const [otp,setOtp] = useState("")

  const submitHandler = (e) =>{
    e.preventDefault()
    console.log("OTP:",otp)
  }

  return (
    <div>
      <h5
        onClick={() => setConfirmRidePopupPanel(false)}
        className="p-1 text-center absolute w-[93%] top-0 "
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-3xl text-gray-600"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm This Ride To Start
      </h3>

      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4 ">
        <div className="flex items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover "
            src="https://www.shutterstock.com/image-photo/handsome-indonesian-southeast-asian-man-260nw-2476654675.jpg"
            alt="user"
          />
          <h2 className="text-lg font-medium">{ride?.user?.fullName?.firstName}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
          <i className="text-lg ri-map-pin-2-line"></i>
          <div>
            <h3 className="text-lg font-medium">PickUp</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {ride?.pickUp}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
          <i className="ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm -mt-1 text-gray-600">
             {ride?.destination}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
          <i className="text-lg ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">${ride?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full">
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
          <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" placeholder="Enter OTP" className="bg-[#eee] px-12 py-2 text-lg font-mono rounded-lg w-full"/>
          <button
            
            onClick={() => {}}
            className="w-full flex items-center justify-center mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setConfirmRidePopupPanel(false);
              setRidePopUpPanel(false);
            }}
            className="w-full mt-2 bg-red-700 text-white font-semibold p-2 rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
