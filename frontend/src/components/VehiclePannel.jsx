import PropTypes from "prop-types";

const VehiclePannel = ({
  setVehiclePannel,
  setConfirmRidePannel,
  fare,
  setVehicleType,
}) => {
  // console.log(fare)
  return (
    <div>
      <h5
        onClick={() => setVehiclePannel(false)}
        className="p-1 text-center absolute w-[93%] top-0 "
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-3xl text-gray-600"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a vehicle </h3>
      {/* Car ride */}
      <div
        onClick={() => {
          setConfirmRidePannel(true);
          setVehicleType("car");
        }}
        className="flex w-full p-3 border-2 mb-2 active:border-black border-gray-300 rounded-xl  items-center justify-between cursor-pointer"
      >
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
        <h2 className="text-xl font-semibold">₹{fare.car}</h2>
      </div>
      {/* Moto Rides */}
      <div
        onClick={() => {
          setConfirmRidePannel(true);
          setVehicleType("moto");
        }}
        className="flex w-full p-3 border-2 mb-2 active:border-black border-gray-300 rounded-xl  items-center justify-between cursor-pointer"
      >
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
        <h2 className="text-xl font-semibold">₹{fare.moto}</h2>
      </div>
      {/* Auto Rides */}
      <div
        onClick={() => {
          setConfirmRidePannel(true);
          setVehicleType("auto");
        }}
        className="flex w-full p-3 border-2 mb-2 active:border-black border-gray-300 rounded-xl items-center justify-between cursor-pointer"
      >
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
        <h2 className="text-xl font-semibold">₹ {fare.auto}</h2>
      </div>
    </div>
  );
};

VehiclePannel.propTypes = {
  setVehiclePannel: PropTypes.func.isRequired,
  setConfirmRidePannel: PropTypes.func.isRequired,
};

export default VehiclePannel;
