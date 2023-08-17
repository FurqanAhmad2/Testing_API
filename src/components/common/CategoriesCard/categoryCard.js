import "./styles.css";

import {
  faBriefcase,
  faMicrochip,
  faPeopleGroup,
  faPlaneDeparture,
  faSchool,
  faLanguage,
  faGavel,
  faWandMagicSparkles,
  faCode,
  faPenNib,
  faDatabase,
  faLock,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <button
      className="categoryCardBtn shadow"
      onClick={() => {
        navigate(`/jobs`, {
          state: { category: `${data.name}+${data.id}` },
        });
      }}
    >
      <div className="iconContainer">
        <FontAwesomeIcon
          icon={
            data.name === "IT & Networking"
              ? faMicrochip
              : data.name === "Translation"
              ? faLanguage
              : data.name === "Legal"
              ? faGavel
              : data.name === "Design and Creative"
              ? faWandMagicSparkles
              : data.name === "Web, Mobile, & Software Development"
              ? faCode
              : data.name === "Writing"
              ? faPenNib
              : data.name === "Data Science and Analysis"
              ? faDatabase
              : data.name === "Admin Support"
              ? faLock
              : data.name === "Accounting and Consulting"
              ? faMoneyBill
              : data.name === "Customer Service"
              ? faPeopleGroup
              : data.name === "Aeronautics"
              ? faPlaneDeparture
              : data.name === "Education"
              ? faSchool
              : faBriefcase
          }
        />
      </div>

      <div className="textContainer">
        <p className="heading">{data?.name}</p>
      </div>
      <div className="jobNumberContainer">
        <div className="jobNumberContent">
          <p>{`${data?.count} Jobs`}</p>
        </div>
      </div>
    </button>
  );
};

export default CategoryCard;
