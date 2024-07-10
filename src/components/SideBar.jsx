import { useState } from "react";
import { FaDatabase, FaBook } from "react-icons/fa6";
import { RiInformationFill, RiContactsFill } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import SideNav, {
 
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Link, useNavigate } from "react-router-dom";

export const SideBar = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const handleSelect = (selected) => {
    setSelectedItem(selected);
  };

  return (
    <div className="bg-blue-600 ">
      <div className="  text-2xl">
        <h1 >Meta Connect</h1>
      </div>
      <div className="">
        <SideNav
          onSelect={handleSelect}
          className="bg-gradient-to-b from-gray-600 to-gray-400 "
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem
              eventKey="database-service"
              className={`text-black ${
                selectedItem === "database-service" ? "bg-blue-500" : ""
              }`}
            >
              <NavIcon>
                <FaDatabase className="text-center h-8 w-8 mx-auto my-2" />
              </NavIcon>
              <NavText>
                <Link to={"/database-service"}>Database Service</Link>
              </NavText>
            </NavItem>
            <NavItem
              eventKey="business-glossary"
              className={`text-black ${
                selectedItem === "business-glossary" ? "bg-blue-500" : ""
              }`}
            >
              <NavIcon>
                <FaBook className="text-center h-8 w-8 mx-auto my-2" />
              </NavIcon>
              <NavText>
                <Link to={"/business-glossary"}>Business Glossary</Link>
              </NavText>
            </NavItem>
            <NavItem
              eventKey="about-us"
              className={`text-black ${
                selectedItem === "about-us" ? "bg-blue-500" : ""
              }`}
            >
              <NavIcon>
                <RiInformationFill className="text-center h-8 w-8 mx-auto my-2" />
              </NavIcon>
              <NavText>
                <Link to={"/about-us"}>About Us</Link>
              </NavText>
            </NavItem>
            <NavItem
              eventKey="contact-us"
              className={`text-black ${
                selectedItem === "contact-us" ? "bg-blue-500" : ""
              }`}
            >
              <NavIcon>
                <RiContactsFill className="text-center h-8 w-8 mx-auto my-2" />
              </NavIcon>
              <NavText>
                <Link to={"/contact-us"}>Contact Us</Link>
              </NavText>
            </NavItem>

            <NavItem
              eventKey="Logout"
              className={`text-black ${
                selectedItem === "contact-us" ? "bg-blue-500" : ""
              }`}
            >
              <NavIcon>
                <LuLogOut className="text-center h-8 w-8 mx-auto my-2" />
              </NavIcon>
              <NavText>
                <button onClick={handleLogout}>Logout</button>
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </div>
    </div>
  );
};
