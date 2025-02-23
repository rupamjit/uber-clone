import {  useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePannel from "../components/VehiclePannel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";


const HomeScreen = () => {
  
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehicalePannel, setVehiclePannel] = useState(false);
  const [confirmRidePannel, setConfirmRidePannel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const [destinationSuggetions, setDestinationSuggetions] = useState([]);
  const [pickUpSuggetions, setPickUpSuggetions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, serFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride,setRide] = useState(null)

  const naviagte = useNavigate()

  const vehicalePannelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePannelRef = useRef(null);
  const panelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("bms");
  };

  const {socket,sendMessage,receiveMessage} = useContext(SocketContext)
  const{user}= useContext(UserDataContext)

  useEffect(()=>{
  
    sendMessage("join",{userType:"user",userId:user._id})

  },[user])

  receiveMessage('ride-confirmed',ride=>{
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
    
  })

  socket.on('ride-started',ride=>{
    console.log("ride")
    setWaitingForDriver(false)
    naviagte("/riding",{state:{ride}})
  })


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

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggetions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDestinationSuggetions(response.data.suggetions);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggetions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickUpSuggetions(response.data.suggetions);
    } catch (error) {
      console.log(error);
    }
  };

  const findTrip = async () => {
    setVehiclePannel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup: pickup,
          destination: destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    serFare(response.data);
  };

  const createRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickUp:pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // console.log(response);
  };

  

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div  className='h-screen w-screen'>
        {/* LiveTracking  */}
        <LiveTracking/>
        {/* <img
          className="h-full w-full object-fit"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}
      </div>
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
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black w-full text-white p-2  rounded-lg "
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white  h-0 opacity-0">
          <LocationSearchPanel
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
            suggetions={
              activeField === "pickup"
                ? pickUpSuggetions
                : destinationSuggetions
            }
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
          fare={fare}
          setVehicleType={setVehicleType}
          setConfirmRidePannel={setConfirmRidePannel}
          setVehiclePannel={setVehiclePannel}
        />
      </div>

      <div
        ref={confirmRidePannelRef}
        className="fixed w-full z-10 bg-white  bottom-0 px-3 py-6 pt-12 translate-y-full"
      >
        <ConfirmRide
          createRide={createRide}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          pickup={pickup}
          setConfirmRidePannel={setConfirmRidePannel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bg-white  bottom-0 px-3 py-6 pt-12 translate-y-full"
      >
        <LookingForDriver vehicleType={vehicleType} fare={fare} destination={destination} pickup={pickup} setVehicleFound={setVehicleFound} />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6 pt-12"
      >
        <WaitingForDriver ride={ride}  setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default HomeScreen;
