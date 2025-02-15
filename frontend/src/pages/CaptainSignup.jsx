import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    // console.log(captainData);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData) 
    if(response.status === 201){
      const data = response.data;
      // console.log(data)
      console.log(data.newCaptain)
       setCaptain(data.newCaptain)
     localStorage.setItem("token",data.token);
     navigate('/captain-home')
    }


    setEmail("");
    setPassword("");
    setLastName("");
    setFirstName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-base font-extrabold mb-2 ">
            What&apos;s Your Name
          </h3>

          <div className="flex gap-4 mb-5">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee]  rounded px-4 py-2 w-1/2 border  placeholder:text-base"
              required
              type="text"
              placeholder="FirstName"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  placeholder:text-base"
              required
              type="text"
              placeholder="LastName"
            />
          </div>

          <h3 className="text-base font-extrabold mb-2 ">
            What&apos;s Your Email
          </h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-base font-extrabold mb-2 ">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />

          <h3 className="text-base font-extrabold mb-2 ">
            {" "}
            Vehicle Information
          </h3>
          <div className="flex gap-4">
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#eeeeee] w-1/2  mb-5 rounded px-4 py-2 border placeholder:text-base"
              required
              type="text"
              placeholder="Vehicle Color"
            />
            <input
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 placeholder:text-base"
              required
              type="text"
              placeholder="Vehicle Plate"
            />
          </div>
          <div className="flex  gap-4">
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-[#eeeeee]  mb-5 rounded px-4 py-2 border w-1/2 placeholder:text-base"
              required
              type="number"
              placeholder="Vehicle Capacity"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee]   mb-5 rounded px-2 py-2 border w-1/2 placeholder:text-base"
              required
              placeholder="SelectVehicle"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Moto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white mb-5 rounded px-4 py-2 border w-full placeholder:text-base">
            Create Captain Account
          </button>
        </form>
        <p className="text-center">
          {"  "}
          Already Have an account?
          <Link to="/captain-login" className="text-blue-600">
            Login Here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, totam?
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
