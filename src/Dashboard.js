import appStyle from "./AppStyle.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

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
export default Dashboard;
