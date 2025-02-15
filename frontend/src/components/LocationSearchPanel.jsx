import PropTypes from "prop-types";

const LocationSearchPanel = ({ setVehiclePannel, setPanelOpen }) => {
  const locations = [
    "24B,Near Kappors cafe , near Kappors building",
    "24B,Near Singania cafe , near singahnia building",
    "24B,Near Sharma cafe , near sharma buildng",
    "24B,Near Malhotra cafe , near Malhotra building",
  ];

  return (
    <div>
      {locations.map((location, index) => (
        <div
          onClick={() => {
            setVehiclePannel(true);
            setPanelOpen(false);
          }}
          key={index}
          className="flex border-2 border-gray-200 active:border-black p-3 rounded-xl  items-center my-2 justify-start gap-4"
        >
          <h2 className="bg-[#eee] rounded-full h-10 w-10 flex items-center justify-center">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

LocationSearchPanel.propTypes = {
  setVehiclePannel: PropTypes.func.isRequired,
  setPanelOpen: PropTypes.func.isRequired,
};

export default LocationSearchPanel;
