import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePannel from "../components/VehiclePannel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const HomeScreen = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehicalePannel, setVehiclePannel] = useState(false);
  const [confirmRidePannel, setConfirmRidePannel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const vehicalePannelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePannelRef = useRef(null);
  const panelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);


  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          opacity: 1,
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          opacity: 0,
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehicalePannel) {
        gsap.to(vehicalePannelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicalePannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicalePannel]
  );

  useGSAP(
    function () {
      if (confirmRidePannel) {
        gsap.to(confirmRidePannelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePannelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePannel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">{/* LiveTracking  */}</div>
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute  right-6 top-6 text-2xl opacity-0"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            className="relative py-3"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white  h-0 opacity-0">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePannel={setVehiclePannel}
          />
        </div>
      </div>

      <div
        ref={vehicalePannelRef}
        className="fixed w-full z-10 bg-white  bottom-0 px-3 py-10 pt-12 translate-y-full"
      >
        <VehiclePannel
          setConfirmRidePannel={setConfirmRidePannel}
          setVehiclePannel={setVehiclePannel}
        />
      </div>

      <div
        ref={confirmRidePannelRef}
        className="fixed w-full z-10 bg-white  bottom-0 px-3 py-6 pt-12 translate-y-full"
      >
        <ConfirmRide setConfirmRidePannel={setConfirmRidePannel} setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={vehicleFoundRef} className="fixed w-full z-10 bg-white  bottom-0 px-3 py-6 pt-12 translate-y-full">
        <LookingForDriver  setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={waitingForDriverRef}  className="fixed w-full z-10 bg-white  bottom-0 px-3 py-6 pt-12">
        <WaitingForDriver  setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  );
};

export default HomeScreen;
