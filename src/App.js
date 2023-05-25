import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import appStyle from "./AppStyle.module.css";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
  Select,
  Alert,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
    <div style={{ width: "100%", height: "100vh" }}>
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
  const [sw, setSw] = useState(false);
  const [data, setData] = useState([]);
  // console.log(data);
  const dataPassing = (obj) => {
    // console.log(obj);
    setData([...obj]);
    // setData((arr) => [...arr, ...obj]);
  };
  console.log(data);
  return (
    <div className={appStyle.containerDiv}>
      <div className={appStyle.loginReg}>
        <Button
          className={appStyle.loginRegBtn}
          onClick={() => setSw(true)}
          variant={`${sw ? "contained" : "outlined"}`}
        >
          Login
        </Button>
        <Button
          className={appStyle.loginRegBtn}
          variant={`${sw ? "outlined" : "contained"}`}
          onClick={() => setSw(false)}
        >
          Register
        </Button>
      </div>
      <div className={appStyle.loginCon}>
        {sw ? <Login dataPass={dataPassing} /> : <Register />}
      </div>

      <div>
        {data.map((item) => (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <p>{item.id}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
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

function Login({ dataPass }) {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email cannot be empty").email(),
    password: Yup.string()
      .required("password cannot be empty")
      .min(8, "minimum pass length is 8")
      .matches(/[0-9]/, "pass must contain a number")
      .matches(/[a-z]/, "pass must contain a lowercase letter")
      .matches(/[A-Z]/, "pass must contain a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });

  const onFormSubmit = async (values) => {
    console.log("on form submit: ", values);
    const requstData = {
      email: values.email,
      password: values.password,
    };
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      requstData
    );
    if (res.status === 201) {
      setOpenSuc(true);
    }

    axios.delete("https://jsonplaceholder.typicode.com/posts/1").then((res) => {
      if (res.status === 200) {
        console.log("deleted");
      }
    });
  };

  const [data, setData] = useState();
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      console.log(res);
      setData(res.data);
      dataPass(res.data);
    });
  }, []);

  const [openSuc, setOpenSuc] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuc(false);
  };
  const vertical = "top";
  const horizontal = "right";

  return (
    <>
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
          values,
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
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Login
              </Button>
            </div>
            <Snackbar
              className={appStyle.snakeBar}
              anchorOrigin={{ vertical, horizontal }}
              open={openSuc}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Login Success
              </Alert>
            </Snackbar>
          </form>
        )}
      </Formik>
    </>
  );
}
function Register() {
  const initialValues = {
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
    confPass: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name cannot be empty")
      .min(3, "name must be of atleast 3 character"),
    lastName: Yup.string()
      .required("Last name cannot be empty")
      .min(3, "name must be of atleast 3 character"),
    role: Yup.string().required("role cannot be empty"),
    email: Yup.string().required("email cannot be empty").email(),
    password: Yup.string()
      .required("password cannot be empty")
      .min(8, "minimum pass length is 8")
      .matches(/[0-9]/, "pass must contain a number")
      .matches(/[a-z]/, "pass must contain a lowercase letter")
      .matches(/[A-Z]/, "pass must contain a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confPass: Yup.string()
      .required("confirm password cannot be empty")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const onFormSubmit = (values) => {
    console.log("on form submit: ", values);
    console.log(values.role);
    alert("Form Submmited");
  };
  return (
    <>
      <div className={appStyle.loginHead}>
        <p>Register</p>
        <div className={appStyle.line}></div>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          isSubmitting,
        }) => (
          <form className={appStyle.form} onSubmit={handleSubmit}>
            <TextField
              error={!!errors.firstName}
              id="firstName"
              name="firstName"
              label="First Name"
              variant="outlined"
              type="text"
              sx={{ width: "80%" }}
              // value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.firstName && (
              <span
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "flex-",
                  width: "80%",
                  marginTop: "-.5rem",
                }}
              >
                {errors.firstName}
              </span>
            )}
            <TextField
              error={!!errors.lastName}
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="outlined"
              type="text"
              sx={{ width: "80%" }}
              // value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.lastName && (
              <span
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "flex-",
                  width: "80%",
                  marginTop: "-.5rem",
                }}
              >
                {errors.lastName}
              </span>
            )}
            <FormControl sx={{ width: "80%" }} error={!!errors.role}>
              <InputLabel id="role">Age</InputLabel>
              <Select
                name="role"
                labelId="role"
                id="role"
                label="Role"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.role}
              >
                <MenuItem value="Buyer">Buyer</MenuItem>
                <MenuItem value="Seller">Seller</MenuItem>
              </Select>
            </FormControl>
            {touched.role && (
              <span
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "flex-",
                  width: "80%",
                  marginTop: "-.5rem",
                }}
              >
                {errors.role}
              </span>
            )}
            <TextField
              error={!!errors.email}
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
            <TextField
              error={!!errors.confPass}
              id="confPass"
              name="confPass"
              label="Confirm Password"
              variant="outlined"
              type="password"
              // value={password}
              onChange={handleChange}
              sx={{ width: "80%" }}
              onBlur={handleBlur}
            />
            {touched.confPass && (
              <span
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "flex-",
                  width: "80%",
                  marginTop: "-.5rem",
                }}
              >
                {errors.confPass}
              </span>
            )}
            <div className={appStyle.loginButton}>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Register
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
