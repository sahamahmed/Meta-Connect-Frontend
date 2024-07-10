import { useState } from "react";
import { TypeEffect } from "../components/TypeEffect";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin((prevState) => !prevState);
  };

  return (
    <div
      style={{
        backgroundImage: `url(/background2.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        maxWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <div className="flex flex-col w-[80%] max-w-7xl px-8 h-full py-8  justify-center items-start ml-8">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-neutral-600 text-5xl font-bold text-center">
            META CONNECT
          </h1>
          <TypeEffect />
        </div>
        {showLogin ? <Login /> : <Signup toggleForm={toggleForm} />}
        <h1 className="text-teal-600 text-2xl font-normal">
          {showLogin ? "New User? Register" : "Already have an account? Login"}
          {""}
          <button
            onClick={toggleForm}
            className=" outline-none focus:outline-none hover:bg-#DEE8F1 hover:underline px-2 py-1 rounded-md"
          >
            here
          </button>
        </h1>
      </div>
    </div>
  );
};

export default Home;
