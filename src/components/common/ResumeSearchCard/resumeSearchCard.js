import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { getCandidateResumes } from "../../../apicalls";
import { AuthContext } from "../../../context/AuthContext";
import ActionButton from "../ActionButton/actionButton";
import { useNavigate } from 'react-router-dom';

import "./styles.css";

const ResumeSearchCard = ({ data }) => {
  const { token } = useContext(AuthContext);
  const {
    isError: resumesError,
    isLoading: resumesLoading,
    data: resumes,
  } = useQuery({
    queryKey: [`CandidateResumes${data.user.id}`, token, data.user.id],
    queryFn: getCandidateResumes,
  });

  const history = useNavigate();

  const handleRedirect = (buttonId) => {
    // Replace 'path-to-redirect' with the actual path you want to navigate to
    history(`/candidateview/${buttonId}`);
  };

  return (
    <div className="resumeSearchCard shadow">
      <div>
        <div className="header">
          <h4>{data.description}</h4>
          <p className="location">{`${data.user.country} • ${data.user.city}`}</p>
        </div>

        <h5>{`${data.user.first_name} ${data.user.last_name}`}</h5>
      </div>

      <p
        className=" hover:bg-blue-800 hover:text-white text-blue-700 font-medium  px-10 cursor-pointer border-2 border-blue-800 rounded-full shadow "
        onClick={() => handleRedirect(data.user.id)}
         type="outline"
      >
        View
      </p>

      {resumes ? (
        <a
          className="viewBtn"
          href={resumes ? `${resumes[resumes.length - 1].resume}` : null}
          target="_blank"
          download
        >
          <ActionButton
            text={resumesLoading ? "Loading..." : "Resume"}
            type="outline"
          />
        </a>
      ) : null}
    </div>
  );
};

export default ResumeSearchCard;
