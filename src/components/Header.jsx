import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navItems = [
    {
      name: "Database Service",
      slug: "/database-service",
    },
    {
      name: "Bisuness Entity",
      slug: "/bisuness-domain",
    },
    {
      name: "About",
      slug: "/about",
    },
    {
      name: "Contact",
      slug: "/contact",
    },
  ];

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      className="  h-full text-black font-bold bg-green-700"
    >
      <Divider />
      <List>
        <ListItem>
          <Link to="/" className="flex justify-center items-center gap-4">
            <h1 className=" text-cyan-400 tracking-widest drop-shadow-[1px_2px_3px_rgba(0,255,255,0.5)]  font-bold text-2xl">
              MetaConnect
            </h1>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        {navItems.map((item) => (
          <NavLink
            to={item.slug}
            key={item.name}
            className={({ isActive }) =>
              `${
                isActive
                  ? "p-3 border-cyan-400 border-b-4 rounded-lg text-cyan-400"
                  : "text-white-700"
              } px-0 py-2 text-center tracking-wider transition rounded-lg duration-200 ease-in-out font-semibold hover:border-cyan-400 hover:border-b-4 hover:text-cyan-400`
            }
          >
            <ListItem key={item.name} disablePadding className="hover:bg-black">
              <ListItemButton>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem className="flex justify-start items-start text-white text-center">
          <LogoutBtn className="text-lg px-2" />
        </ListItem>
      </List>
    </Box>
  );
  return (

    <header
      className={`py-6 px-4 border-b-2 border-b-cyan-400 h-20 md:h-fit 
        bg-gray-800 text-white`}
    >
      
        {/* MOBILE DISPLAY */}
        <div className="nav-container flex flex-row justify-between items-center lg:hidden relative">
          <div className="mr-6">
            
          </div>
          <div className="lg:hidden">
            <Button onClick={toggleDrawer(true)}>
              <MenuIcon className="text-white font-semibold text-lg" />
            </Button>
            <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
        </div>

        
    </header>
  );
}

export default Header;
