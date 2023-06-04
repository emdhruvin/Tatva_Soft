import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import Cart from "./Cart";
import NoMatch from "./NoMatch";
import Login from "./Login";
import Register from "./Register";
import appStyle from "./AppStyle.module.css";
import { useAuth } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <div className={appStyle.mainDiv}>
      <Layout />

      <ToastContainer />
      <Routes>
        <Route path="login" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="register" element={isLoggedIn ? <Home /> : <Register />} />
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="about" element={isLoggedIn ? <About /> : <Login />} />
        <Route path="cart" element={isLoggedIn ? <Cart /> : <Login />} />
        <Route path="*" element={isLoggedIn ? <NoMatch /> : <Login />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
