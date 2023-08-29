import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ScreenError from "../../components/common/ScreenError/screenError";
import ActionButton from "../../components/common/ActionButton/actionButton";
import Spinner from "../../components/common/spinner";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";
import { deleteResume, getResumes } from "../../apicalls";
import { toast } from "react-toastify";
import ResumeCard from "../../components/common/resumeCard";

const Resume = () => {
  const { type, token } = useContext(AuthContext);
  const {
    isError: resumeError,
    isLoading: resumeLoading,
    data: resumes,
    refetch,
  } = useQuery({
    queryKey: ["EmployeeResumes", token],
    queryFn: getResumes,
    enabled: type === "EMPLOYEE",
  });

  const DeleteResume = async (id) => {
    const res = await deleteResume(token, id, toast);
    if (res === "SUCCESS") refetch();
  };

  if (resumeLoading) return <ScreenLoading />;
  if (resumeError) return <ScreenError />;

  return (
    <>
      <div className="profileBanner">
        <div className="bannerContent">
          <h1>Resume</h1>
        </div>
      </div>

      <div className="profileMainContainer shadow">
        <div className="employeeDataContainer">
          {!resumes?.length ? (
            <h4 className="warningText">No resumes added</h4>
          ) : (
            <div className="resumeContainer">
              {resumes.map((e, index) => {
                return (
                  <ResumeCard
                    index={index}
                    e={e}
                    deleteFunc={() => {
                      DeleteResume(e.id);
                    }}
                  />
                );
              })}
            </div>
          )}

          <div>
            <Link to="/uploadresume">
              <ActionButton text="Upload Resume" handleClick={() => {}} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
