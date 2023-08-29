import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Row1 = ({ title }) => {
  return (
    <>
      <div className="row1">
        <div className="iconContainer">
          <FontAwesomeIcon icon={faDotCircle} />
        </div>

        <p className="value">{title}</p>
      </div>
    </>
  );
};

export default Row1;
