const RidePopUp = ({ setRidePopUpPanel,setConfirmRidePopupPanel ,ride,confirmRide }) => {

  console.log(ride)
  return (
    <div>
      <h5
        onClick={() => setRidePopUpPanel(false)}
        className="p-1 text-center absolute w-[93%] top-0 "
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-3xl text-gray-600"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available</h3>

      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4 ">
        <div className="flex items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover "
            src="https://www.shutterstock.com/image-photo/handsome-indonesian-southeast-asian-man-260nw-2476654675.jpg"
            alt="user"
          />
          <h2 className="text-lg font-medium">{ride?.user?.fullName.firstName+" "+ride?.user?.fullName.lastName}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
          <i className="text-lg ri-map-pin-2-line"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {ride?.pickUp}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
          <i className="ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">$193.20</h3>
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
      <button
        onClick={() => {
            setConfirmRidePopupPanel(true)
            confirmRide()
        }}
        className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
      >
        Except
      </button>
      <button
        onClick={() => setRidePopUpPanel(false)}
        className="w-full mt-2 bg-gray-400 text-white font-semibold p-2 rounded-lg"
      >
        Ignore
      </button>
    </div>
  );
};

export default RidePopUp;
