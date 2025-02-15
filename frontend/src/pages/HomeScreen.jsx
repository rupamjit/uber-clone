import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const HomeScreen = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);

  const [vehicalePannel, setVehiclePannel] = useState(false);
  const vehicalePannelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const panelRef = useRef(null);

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
        className="fixed w-full z-10 bg-white  bottom-0 px-3 py-10 pt-14 translate-y-full"
      >
        <h5
          onClick={() => setVehiclePannel(false)}
          className="p-1 text-center absolute w-[93%] top-0 "
        >
          {" "}
          <i className="ri-arrow-down-wide-line text-3xl text-gray-600"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-5">Choose a vehicle </h3>
        {/* Car ride */}
        <div className="flex w-full p-3 border-2 mb-2 active:border-black border-gray-300 rounded-xl  items-center justify-between cursor-pointer">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png"
            alt=""
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-sm">
              UberGo
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, compact price
            </p>
          </div>
          <h2 className="text-xl font-semibold">$193.20</h2>
        </div>
        {/* Moto Rides */}
        <div className="flex w-full p-3 border-2 mb-2 active:border-black border-gray-300 rounded-xl  items-center justify-between cursor-pointer">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png"
            alt=""
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-sm">
              Moto
              <span>
                <i className="ri-user-3-fill"></i>1
              </span>
            </h4>
            <h5 className="font-medium text-sm">3 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable motorcycles rides
            </p>
          </div>
          <h2 className="text-xl font-semibold">$65.17</h2>
        </div>
        {/* Auto Rides */}
        <div className="flex w-full p-3 border-2 mb-2 active:border-black border-gray-300 rounded-xl items-center justify-between cursor-pointer">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt=""
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-sm">
              UberAuto
              <span>
                <i className="ri-user-3-fill"></i> 3
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable auto rides
            </p>
          </div>
          <h2 className="text-xl font-semibold">$118.21</h2>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
