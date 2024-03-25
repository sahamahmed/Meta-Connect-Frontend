import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gradient-to-b from-gray-500 to-gray-400">
        <div className="w-full block">
          {!isHomePage && <Header />}
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
