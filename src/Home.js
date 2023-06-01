import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import appStyle from "./AppStyle.module.css";
import { Button } from "@mui/material";

import DisplayCard from "./DisplayCard";
function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dData, setDData] = useState(location.state.data);
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
      <div
        style={{
          width: "100%",
          marginTop: "1rem",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
          gap: "1.2rem",
          flexWrap: "wrap",
        }}
      >
        {dData.map((item) => (
          <DisplayCard data={item} />
        ))}
      </div>
    </div>
  );
}
export default Home;
