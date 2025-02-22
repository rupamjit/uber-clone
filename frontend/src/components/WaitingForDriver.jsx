const WaitingForDriver = ({setWaitingForDriver,ride}) => {

  // if(ride !== null){
  //   console.log(ride)
  // }

  return (
    <div>
      <h5
        onClick={() => {setWaitingForDriver(false)
      
        }}
        className="p-1 text-center  absolute w-[93%] top-0 "
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-3xl text-gray-600"></i>
      </h5>

      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">{ride?.captain?.fullName?.firstName}</h2> 
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain?.vehicle?.plate}</h4>
          <p className="text-sm text-gray-600">Lamborgini</p>
          <p className="text-sm text-gray-600">{ride?.otp}</p>
        </div>
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
            <h3 className="text-lg font-medium">562/11 - A</h3>
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
    </div>
  );
};

export default WaitingForDriver;
