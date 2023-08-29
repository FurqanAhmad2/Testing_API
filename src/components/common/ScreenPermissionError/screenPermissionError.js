import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "../ActionButton/actionButton";
import { useNavigate } from "react-router-dom";

const ScreenPermissionError = () => {
  const navigate = useNavigate();

  return (
    <div className="screenErrorContainer">
      <div className="errorScreenContent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <h2>This feature is not available for the current plan.</h2>
        <h2>Please Check our plans and upgrade to use this feature.</h2>

        <div style={{ marginTop: 20 }}>
          <ActionButton
            text="View Plans"
            handleClick={() => {
              navigate("/plans");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScreenPermissionError;
