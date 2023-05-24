import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import appStyle from "./AppStyle.module.css";
import { Button, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";

import { Formik } from "formik";
import * as Yup from "yup";

function App() {
  return (
    <div className={appStyle.mainDiv}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

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
  return (
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
          <Avatar sx={{ bgcolor: "white", color: "black" }}>DT</Avatar>
          <p>Dhruvin Tandel</p>
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
          <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>Account</p>
          <Button onClick={() => navigate("/about")} variant="contained">
            Logout
          </Button>
        </div>
      </Popover>
      <Outlet />
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div className={appStyle.containerDiv}>
      <h2 className={appStyle.heading}>Home</h2>
      <div className={appStyle.buttonContainer}>
        <Button
          className={appStyle.button}
          variant="outlined"
          onClick={() => navigate("/about")}
        >
          About
        </Button>

        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>
        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/nothing-here")}
        >
          Nothing
        </Button>
      </div>
    </div>
  );
}

function About() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(),
    password: Yup.string()
      .min(8, "minimum pass length is 8")
      .matches(/[0-9]/, "pass must contain a number")
      .matches(/[a-z]/, "pass must contain a lowercase letter")
      .matches(/[A-Z]/, "pass must contain a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });

  const onFormSubmit = (values) => {
    console.log("on form submit: ", values);
    alert("Form Submmited");
  };

  // const navigate = useNavigate();
  return (
    <div className={appStyle.containerDiv}>
      <div className={appStyle.loginCon}>
        <div className={appStyle.loginHead}>
          <p>Login</p>
          <div className={appStyle.line}></div>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onFormSubmit}
          validationSchema={validationSchema}
        >
          {({
            value,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
          }) => (
            <form className={appStyle.form} onSubmit={handleSubmit}>
              <TextField
                error={!!errors.email}
                required
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                type="text"
                sx={{ width: "80%" }}
                // value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && (
                <span
                  style={{
                    color: "red",
                    display: "flex",
                    justifyContent: "flex-",
                    width: "80%",
                    marginTop: "-.5rem",
                  }}
                >
                  {errors.email}
                </span>
              )}
              <TextField
                error={!!errors.password}
                required
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                // value={password}
                onChange={handleChange}
                sx={{ width: "80%" }}
                onBlur={handleBlur}
              />
              {touched.password && (
                <span
                  style={{
                    color: "red",
                    display: "flex",
                    justifyContent: "flex-",
                    width: "80%",
                    marginTop: "-.5rem",
                  }}
                >
                  {errors.password}
                </span>
              )}
              <div className={appStyle.loginButton}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className={appStyle.containerDiv}>
      <h2 className={appStyle.heading}>Dashboard</h2>
      <div className={appStyle.buttonContainer}>
        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/about")}
        >
          {" "}
          About
        </Button>
        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/nothing-here")}
        >
          {" "}
          Nothing
        </Button>
      </div>
    </div>
  );
}

function NoMatch() {
  const navigate = useNavigate();
  return (
    <div className={appStyle.containerDiv}>
      <h2 className={appStyle.heading}>Nothing to see here!</h2>

      <div className={appStyle.buttonContainer}>
        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/about")}
        >
          {" "}
          About
        </Button>
        <Button
          variant="outlined"
          className={appStyle.button}
          onClick={() => navigate("/dashboard")}
        >
          {" "}
          Dashboard
        </Button>
      </div>
      <p>
        <Link className={appStyle.link} to="/">
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
