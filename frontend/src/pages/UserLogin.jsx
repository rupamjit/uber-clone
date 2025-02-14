import { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });
    console.log(userData);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-extrabold mb-2 ">
            What&apos;s Your Email
          </h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full placeholder:text-base"
            required
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-extrabold mb-2 ">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full placeholder:text-base"
            required
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white mb-7 rounded px-4 py-2 border w-full placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          {"  "}
          New Here?
          <Link to="/signup" className="text-blue-600">
            Create a new Account
          </Link>
        </p>
      </div>
      <div>
        <Link to="/captain-login" className="flex items-center justify-center bg-[#10b461] text-white mb-7 rounded px-4 py-2 border w-full ">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
