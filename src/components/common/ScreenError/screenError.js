import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const ScreenError = () => {
  return (
    <div className="screenErrorContainer">
      <div className="errorScreenContent">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <h2>Something Went Wrong</h2>
      </div>
    </div>
  );
};

export default ScreenError;
