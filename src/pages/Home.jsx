import { Link } from "react-router-dom";
import { TypeEffect } from "../components/TypeEffect";
import Login from './Login'
const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(/background2.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className=" flex flex-col w-[80%] max-w-7xl  px-8 h-full py-20 justify-center items-start ml-8">
          <div>
            <h1 className="text-#4A4A4A text-5xl font-bold ">META CONNECT</h1>
          <TypeEffect />
          </div>
        <Login />
        <h1 className="text-#4A4A4A text-2xl  ">
          New User? Register <Link>here</Link>
        </h1>
      </div>
    </div>
  );
};

export default Home;
