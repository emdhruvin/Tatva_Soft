import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#282c34",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        color: "#eee",
        alignItems: "center",
        padding: "2rem 0",
      }}
    >
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
  return (
    <div style={{ width: "100%" }}>
      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <li>
            <Link
              style={{
                color: "#eee",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              style={{
                color: "#eee",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              style={{
                color: "#eee",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              style={{
                color: "#eee",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              to="/nothing-here"
            >
              Nothing Here
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: "4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h2
        style={{
          fontFamily: "sans-serif",
          fontSize: "1.625rem",
          fontWeight: "bold",
        }}
      >
        Home
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button
          style={{
            width: "145px",
            padding: ".7em 1em",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/about")}
        >
          {" "}
          About
        </button>
        <button
          style={{
            width: "145px",
            padding: ".7em 1em",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/dashboard")}
        >
          {" "}
          Dashboard
        </button>
        <button
          style={{
            width: "145px",
            padding: ".7em 1em",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
            border: "0",
            outline: "0",
          }}
          onClick={() => navigate("/nothing-here")}
        >
          {" "}
          Nothing
        </button>
      </div>
    </div>
  );
}

function About() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: "4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h2
        style={{
          fontFamily: "sans-serif",
          fontSize: "1.625rem",
          fontWeight: "bold",
        }}
      >
        About
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button
          style={{
            width: "145px",
            padding: ".7em 1em",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/")}
        >
          {" "}
          Home
        </button>
        <button
          style={{
            width: "145px",
            padding: ".7em 1em",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/dashboard")}
        >
          {" "}
          Dashboard
        </button>
        <button
          style={{
            width: "145px",
            padding: ".7em 1em",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/nothing-here")}
        >
          {" "}
          Nothing
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: "4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h2
        style={{
          fontFamily: "sans-serif",
          fontSize: "1.625rem",
          fontWeight: "bold",
        }}
      >
        Dashboard
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button
          style={{
            width: "145px",
            padding: ".7em 1em",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/")}
        >
          {" "}
          Home
        </button>
        <button
          style={{
            width: "145px",
            padding: ".7em 1em",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/about")}
        >
          {" "}
          About
        </button>
        <button
          style={{
            width: "145px",
            padding: ".7em 1em",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/nothing-here")}
        >
          {" "}
          Nothing
        </button>
      </div>
    </div>
  );
}

function NoMatch() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: "4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h2
        style={{
          fontFamily: "sans-serif",
          fontSize: "1.625rem",
          fontWeight: "bold",
        }}
      >
        Nothing to see here!
      </h2>
      <p>
        <Link
          style={{
            color: "#eee",
            textDecoration: "none",
            fontWeight: "bold",
          }}
          to="/"
        >
          Go to the home page
        </Link>
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button
          style={{
            width: "145px",
            padding: ".7em 1em",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/")}
        >
          {" "}
          Home
        </button>
        <button
          style={{
            width: "145px",
            padding: ".7em 1em",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/about")}
        >
          {" "}
          About
        </button>
        <button
          style={{
            width: "145px",
            padding: ".7em 1em",
            borderRadius: "2rem",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/dashboard")}
        >
          {" "}
          Dashboard
        </button>
      </div>
    </div>
  );
}
