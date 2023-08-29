import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card1 = ({ value, label, icon }) => {
  return (
    <>
      <div className="card1 shadow">
        <div className="iconContainer">
          <FontAwesomeIcon icon={icon} />
        </div>

        <p className="value">{value}</p>
        <p className="desc">{label}</p>
      </div>
    </>
  );
};

export default Card1;
