import { useState } from "react";
import { Link } from "react-router-dom";



const CaptainSignup = () => {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
      setUserData({
        email: email,
        password: password,
        firstName:firstName,
        lastName:lastName
      });
      console.log(userData);
      setEmail("");
      setPassword("");
      setLastName("");
      setFirstName("");
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
          <button className="bg-[#111] text-white mb-5 rounded px-4 py-2 border w-full placeholder:text-base">
            SignUp
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
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup