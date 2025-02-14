const UserLogin = () => {
  return (
    <div>
      <form className="p-7">
        <h3 className="text-lg font-extrabold mb-2 ">What&apos;s Your Email</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full placeholder:text-base"
          required
          type="email"
          placeholder="email@example.com"
        />
        <h3 className="text-lg font-extrabold mb-2 ">Enter Password</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full placeholder:text-base"
          required
          type="password"
          placeholder="password"
        />
        <button className="bg-[#111] text-white mb-7 rounded-lg px-4 py-2 border w-full placeholder:text-base">
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
