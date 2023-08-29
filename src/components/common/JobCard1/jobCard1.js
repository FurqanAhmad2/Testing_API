import "./styles.css";

import { Link, useNavigate } from "react-router-dom";
import JobLogo from "../../../img/company_logo_1.png";
import SubHeading1 from "../SubHeading1/subHeading1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "../ActionButton/actionButton";

const JobCard1 = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="jobCardBtnContainer shadow">
      <div className="jobCardBtn shadow">
        <div className="jobNumberContainer">
          <div className="jobNumberContent">
            <p>{data?.job_type}</p>
          </div>
        </div>

        <div className="textContainer">
          <p className="jobTitle">{data.title}</p>
          <p className="companyTitle">{data.company.name}</p>
        </div>

        <div className="btnContainer">
          <ActionButton
            text={"VIEW"}
            type={"outline"}
            handleClick={() => {
              navigate(`/job/${data.id}`);
            }}
          />
        </div>
      </div>

      <div className="jobImageContainer">
        <div className="imgContainer">
          <FontAwesomeIcon icon={faBriefcase} />
        </div>
      </div>
    </div>
  );
};

export default JobCard1;
