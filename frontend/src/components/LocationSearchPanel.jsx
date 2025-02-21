
const LocationSearchPanel = ({
  suggetions,
  setDestination,
  activeField,
  setPickup,
}) => {
  const handleClick = (location) => {
    if (activeField === "pickup") {
      setPickup(location.description);
    } else {
      setDestination(location.description);
    }
  };
  // console.log(suggetions);
  
  return (
    <div className="mt-2">
      {suggetions.map((location, index) => (
        <div
          onClick={() => {
            handleClick(location);
          }}
          key={index}
          className="flex border-2 border-gray-200 active:border-black p-3 rounded-xl  items-center my-2 justify-start gap-4"
        >
          <h2 className="bg-[#eee] rounded-full h-10 w-10 flex items-center justify-center">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{location?.description}</h4>
        </div>
      ))}
    </div>
  );
};



export default LocationSearchPanel;
