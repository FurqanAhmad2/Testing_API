import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Verify = () => {
  return (
    <div className="verifyContainer">
      <div className="verifyContent">
        <div className="iconContainer">
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
        <h3>Your Profile has been verified</h3>
        <p>Please Sign In</p>
        <Link to="/signin">
          <button className="button">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Verify;
