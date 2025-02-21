import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {

  const [finishedRidePanel,setFinishedRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)

  const location = useLocation()
  const rideData = location.state?.ride

   useGSAP(
    function () {
      if (finishedRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishedRidePanel]
  );

  return (
    <div className="h-screen relative flex flex-col justify-end">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <LiveTracking/>
        <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div onClick={()=>{
        setFinishedRidePanel(true)
      }} className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10">
        <h5
          className="p-1 text-center w-[90%] absolute top-0"
        >
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <div className="flex items-center flex-col">
          <h4 className="text-xl font-semibold">RideId: {rideData._id}</h4>
        <button className=" bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
        </div>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full  z-10 bg-white translate-y-full   bottom-0 px-3 py-6 pt-12"
      >
        <FinishRide
        rideData={rideData}
          setFinishedRidePanel={setFinishedRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
