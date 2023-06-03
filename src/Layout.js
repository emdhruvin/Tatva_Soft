import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import appStyle from "./AppStyle.module.css";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import { Button } from "@mui/material";
import { useAuth } from "./AuthContext";

function Layout() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { isLoggedIn, setUser, user, setIsLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn ? (
        <div style={{ width: "100%" }}>
          <nav>
            <img
              src={`${process.env.REACT_APP_URL}logo192.png`}
              alt="react"
              style={{
                width: "48px",
                position: "absolute",
                top: "1.3rem",
                left: "1.5rem",
              }}
            />
            <ul className={appStyle.navbarStyle}>
              <li>
                <Link className={appStyle.link} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className={appStyle.link} to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className={appStyle.link} to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className={appStyle.link} to="/nothing-here">
                  Nothing Here
                </Link>
              </li>
            </ul>
            <div className={appStyle.profile} onClick={handleClick}>
              <Avatar sx={{ bgcolor: "white", color: "black" }}>{`${
                user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
              }`}</Avatar>
              <p>{`${
                user.firstName[0].toUpperCase() + user.firstName.slice(1)
              } ${user.lastName[0].toUpperCase() + user.lastName.slice(1)}`}</p>
            </div>
          </nav>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <div
              style={{
                padding: ".5rem",
              }}
            >
              <Button
                onClick={() => {
                  setUser(null);
                  setIsLoggedIn(false);
                  localStorage.clear();
                  navigate("/login");
                }}
                variant="contained"
              >
                Logout
              </Button>
            </div>
          </Popover>
          {/* <Outlet /> */}
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <nav>
            <img
              src={`${process.env.REACT_APP_URL}logo192.png`}
              alt="react"
              style={{
                width: "48px",
                position: "absolute",
                top: "1.3rem",
                left: "1.5rem",
              }}
            />
            <ul className={appStyle.navbarStyle}>
              <li>
                <Link className={appStyle.link} to="/login">
                  Login{" "}
                </Link>
              </li>
              <li>
                <Link className={appStyle.link} to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default Layout;
