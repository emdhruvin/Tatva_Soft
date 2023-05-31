import { useState } from "react";
import appStyle from "./AppStyle.module.css";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "./AuthContext";

function Login() {
  const { setIsLoggedIn, setUser } = useAuth();
  const [isSucess, setIsSuccess] = useState(false);

  const LOGIN_END_POINT = "api/user/login";
  // { dataPass }
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
      .matches(/[^\w]/, "Pa`ssword requires a symbol"),
  });
  const onFormSubmit = async (values) => {
    console.log("on form submit: ", values);
    const requstData = {
      email: values.email,
      password: values.password,
    };
    await axios
      .post(
        `https://book-e-sell-node-api.vercel.app/${LOGIN_END_POINT}`,
        requstData
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          setIsLoggedIn(true);
          setUser(res.data.result);
          setIsSuccess(true);
          setOpenSuc(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
          setIsSuccess(false);
          setOpenSuc(true);
        }
      })
      .catch((err) => console.log(err));
    // console.log(`${process.env.BASE_URL}${LOGIN_END_POINT}`);
    // const res = await axios.post(
    //   `https://book-e-sell-node-api.vercel.app/${LOGIN_END_POINT}`,
    //   requstData
    // );
    // if (res.status === 200) {
    //   setOpenSuc(true);
    // }
    // if (res.status === 401) {
    //   setOpenInvalid(true);
    // }
    // console.log(res);
  };

  // const [data, setData] = useState();
  // useEffect(() => {
  //   axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
  //     console.log(res);
  //     setData(res.data);
  //     // dataPass(res.data);
  //   });
  // }, []);

  const [openSuc, setOpenSuc] = useState(false);
  const handleCloseSuc = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuc(false);
  };

  // const [openInvalid, setOpenInvalid] = useState(false);
  // const handleCloseErr = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpenInvalid(false);
  // };
  const vertical = "top";
  const horizontal = "right";

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "4rem",
          gap: "1rem",
          flex: "1",
          // height: "100vh",
          // overflow: "hidden",
        }}
      >
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
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </div>
                <Snackbar
                  className={appStyle.snakeBar}
                  anchorOrigin={{ vertical, horizontal }}
                  open={openSuc}
                  autoHideDuration={1500}
                  onClose={handleCloseSuc}
                >
                  <Alert
                    onClose={handleCloseSuc}
                    severity={isSucess ? "success" : "error"}
                    sx={{ width: "100%" }}
                  >
                    {isSucess ? "Login Success" : "Invalid Credential"}
                  </Alert>
                </Snackbar>
                {/* <Snackbar
                  className={appStyle.snakeBar}
                  anchorOrigin={{ vertical, horizontal }}
                  open={openInvalid}
                  autoHideDuration={3000}
                  onClose={handleCloseErr}
                >
                  <Alert
                    onClose={handleCloseErr}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    Invalid email or password
                  </Alert>
                </Snackbar> */}
              </form>
            )}
          </Formik>
        </div>
        <Link to="/register" className={appStyle.loginLink}>
          Register a new user
        </Link>
      </div>
    </>
  );
}
export default Login;
