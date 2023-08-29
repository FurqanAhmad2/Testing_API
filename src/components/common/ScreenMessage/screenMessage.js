import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const ScreenMessage = ({ icon, message }) => {
  return (
    <div className="screenMessageContainer">
      <div className="errorMessageContent">
        {icon && <FontAwesomeIcon icon={icon} />}
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default ScreenMessage;
