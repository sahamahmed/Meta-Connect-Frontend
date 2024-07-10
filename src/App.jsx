/* eslint-disable no-unused-vars */
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import MiniDrawer  from "./components/SideBar2";
import {SideBar} from "./components/SideBar"
function App() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <>
      <div
        className="min-h-screen "
        style={{
          backgroundImage: `url(/background3.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxWidth: "100vw",
          minHeight: "100vh",
        }}
      >
       <div className="flex flex-grow w-full">
         {!isHomePage && <MiniDrawer />}
        <div className={`${isHomePage ? "w-full block" : "w-full mt-8 "}  `}>
          <main className=" md:ml-0 mt-12">
            <Outlet />
          </main>
        </div>
       </div>
      </div>
    </>
  );
}

export default App;
