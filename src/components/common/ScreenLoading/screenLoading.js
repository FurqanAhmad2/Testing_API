import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../spinner";

const ScreenLoading = () => {
  return (
    <div className="screenLoadingContainer">
      <div className="content">
        <Spinner />
      </div>
    </div>
  );
};

export default ScreenLoading;
