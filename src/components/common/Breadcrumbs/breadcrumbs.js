import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./styles.css";

const Breadcrumbs = ({ text }) => {
  return (
    <div className="breadcrumbsContainer">
      <Link to="/">
        <p>Home</p>
      </Link>
      <FontAwesomeIcon icon={faAngleDoubleRight} />
      <p>{text}</p>
    </div>
  );
};

export default Breadcrumbs;
