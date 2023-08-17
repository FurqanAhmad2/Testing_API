import { useNavigate, useParams } from "react-router-dom";
import {
  getJobApplications,
  getJobById,
  getJobScore,
  getResumes,
  postJobApplication,
} from "../apicalls";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import CompanyLogo from "../img/company_logo_1.png";
import Spinner from "../components/common/spinner";
import QuestionForm from "../components/common/QuestionForm/questionForm";
import Modal from "../components/common/Modal/modal";

const JobPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { token, type } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [resume, setResume] = useState(null);

  const { isError, isLoading, data } = useQuery({
    queryKey: [`JobId${jobId}`, token, jobId],
    queryFn: getJobById,
    enabled: !!jobId,
  });

  const { isLoading: resumeLoading, data: resumes } = useQuery({
    queryKey: ["EmployeeResumes", token],
    queryFn: getResumes,
    enabled: type === "EMPLOYEE",
  });

  const { isLoading: jobsappliedLoading, data: jobsapplied } = useQuery({
    queryKey: [`JobApplied`, token],
    queryFn: getJobApplications,
    enabled: type === "EMPLOYEE",
  });

  const { isLoading: jobScoreLoading, data: jobScore } = useQuery({
    queryKey: [`JobScore${jobId}`, token, jobId],
    queryFn: getJobScore,
    enabled: type === "EMPLOYEE",
  });
  console.log(data);
  useEffect(() => {
    if (jobsapplied?.applied?.length) {
      for (let i = 0; i < jobsapplied.applied.length; i++) {
        if (jobsapplied.applied[i].job.id === parseInt(jobId)) {
          setApplied(true);
          break;
        }
      }
    }
  }, [jobsapplied]);

  const HandleSubmit = async () => {
    let arr = [];
    for (let key in answers) {
      arr.push({ q_id: key, answer: answers[key] });
    }

    if (arr.length !== data.question_set.length) {
      toast("Answers all questions");
      return;
    }

    if (!resume) {
      toast("Select Resume");
      return;
    }

    setLoading(true);
    const res = await postJobApplication(
      token,
      jobId,
      resume,
      arr,
      toast,
      setLoading,
      navigate
    );

    if (res === "SUCCESS") {
      setIsModalOpen(false);
      setApplied(true);
    }
  };

  if (isLoading)
    return (
      <div className="loadingContainer">
        <Spinner />
      </div>
    );
  if (isError) return <h1>Error</h1>;

  return (
    <div className="jobPageContainer">
      <section class="padd-top-80 padd-bot-60">
        <div class="container">
          <div>
            <div class="col-md-8 col-sm-7">
              <div class="detail-wrapper">
                <div
                  class="detail-wrapper-body"
                  style={{ display: "grid", placeItems: "center" }}
                >
                  <div>
                    <div
                      class="text-center user_profile_img"
                      style={{ padding: 0 }}
                    >
                      <img src={CompanyLogo} class="width-100" alt="" />
                      <h4 class="meg-0">{data?.title}</h4>
                      <span>{data.company.name}</span>
                      <div class="text-center">
                        {type === "EMPLOYEE" ? (
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#signin"
                            class="btn-job theme-btn job-apply"
                            onClick={() => {
                              if (!token) {
                                toast("Please Sign In first");
                                navigate("/signin");
                              } else if (applied) {
                                toast("Already applied");
                              } else {
                                setIsModalOpen(true);
                              }
                            }}
                          >
                            {applied ? "Applied" : "Apply now"}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {token && type === "EMPLOYEE" ? (
                <div className="matchContainer shadow">
                  <p>{`Your profile matches this job by ${jobScore?.score.toFixed(
                    2
                  )}%`}</p>
                </div>
              ) : null}

              <div class="detail-wrapper">
                <div class="detail-wrapper-header">
                  <h4>Job Description</h4>
                </div>
                <div class="detail-wrapper-body">
                  <p>{data.description}</p>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-sm-5">
              <div class="sidebar">
                <div class="widget-boxed">
                  <div class="widget-boxed-header">
                    <h4>
                      <i class="ti-location-pin padd-r-10"></i>Details
                    </h4>
                  </div>
                  <div class="widget-boxed-body">
                    <div class=" no-border detailListContainer">
                      {data.salary_min !== 0 && data.salary_max !== 0 && (
                        <div className="listItem">
                          <i class="ti-credit-card padd-r-10"></i>
                          {`${data.salary_min} To ${data.salary_max}/Month`}
                        </div>
                      )}
                      <div className="listItem">
                        <i class="ti-user padd-r-10"></i>
                        {`${data.vacancy} Open ${
                          data.vacancy === 1 ? "Position" : "Positions"
                        }`}
                      </div>
                      <div className="listItem">
                        <i class="ti-calendar padd-r-10"></i>
                        {data.job_type}
                      </div>
                      <div className="listItem">
                        <i class="ti-location-pin padd-r-10"></i>
                        {data.city && data.state && data.country
                          ? `${data.city}, ${data.state}, ${data.country}`
                          : !data.city && data.state && data.country
                          ? `${data.state}, ${data.country}`
                          : !data.city && !data.state && data.country
                          ? `${data.country}`
                          : ""}
                      </div>
                      <div className="listItem">
                        <i class="ti-time padd-r-10"></i>
                        {data.timezone}
                      </div>

                      {data.skills && (
                        <div style={{ marginTop: 10 }}>
                          <p>Skills Required</p>
                          <ul>
                            {data.skills.split(",").map((e) => {
                              if (!e) return;
                              return <li>{e}</li>;
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal modal={isModalOpen} setModal={setIsModalOpen}>
        <QuestionForm
          data={data.question_set}
          answers={answers}
          setAnswers={setAnswers}
          resumes={resumes}
          setResume={setResume}
          loading={loading}
          handleSubmit={() => {
            HandleSubmit();
          }}
        />
      </Modal>
    </div>
  );
};

export default JobPage;
