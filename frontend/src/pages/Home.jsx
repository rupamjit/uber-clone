import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-cover bg-bottom bg-[url(https://www.heytaxicabs.com/_next/image?url=/static/images/ride-with-uber-another.png&w=1200&q=75)] pt-10 h-screen w-full flex flex-col justify-between  bg-red-400">
      <img
        className="w-2xs ml-8"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="bg-white py-7 px-4 ">
        <h1 className="text-2xl font-bold">Getting Started With Uber</h1>
        <Link to="/login" className="flex items-center justify-center mt-4 bg-black text-white rounded-lg p-4">
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
