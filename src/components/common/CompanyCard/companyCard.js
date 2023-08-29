import { faStar as solidstar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularstar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CompanyCard = ({ data }) => {
  return (
    <div className="companyCardContainer">
      <div className="imageContainer">
        <img src={data.imageUrl} />
      </div>
    </div>
  );
};

export default CompanyCard;
