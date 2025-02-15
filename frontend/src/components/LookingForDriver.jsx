

const LookingForDriver = ({setVehicleFound}) => {
  return (
   <div>
      <h5
        onClick={() => setVehicleFound(false)}
        className="p-1 text-center absolute w-[93%] top-0 "
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-3xl text-gray-600"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking For a Driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png"
          alt="uber_car"
        />
      </div>

      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
          <i className="text-lg ri-map-pin-2-line"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              Kankariya Talab,Ahmdebad
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
          <i className="ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">$193.20</h3>
            <p className="text-sm -mt-1 text-gray-600">
              Kankariya Talab,Ahmdebad
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
           <i className="text-lg ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">$193.20</h3>
            <p className="text-sm -mt-1 text-gray-600">
             Cash Cash
            </p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default LookingForDriver