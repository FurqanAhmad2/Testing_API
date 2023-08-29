import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faFile, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import JobImage from "../../../img/company_logo_1.png";
import { PopupModal, PopupWidget } from "react-calendly";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import {
  getJobOnboardingQuestions,
  getOnbordingVideo,
  postJobOnboardingQuestionResponse,
  getOnboardingFileTypes,
  postOnboardingFileTypes,
  deleteOnboardingFileTypes,
  patchJob,
} from "../../../apicalls";
import Spinner from "../spinner";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { format } from "date-fns";
import QuestionForm from "../QuestionForm/questionForm";
import Modal from "../Modal/modal";
import ActionButton from "../ActionButton/actionButton";
import SubHeading1 from "../SubHeading1/subHeading1";

const FileCard = ({ data, token, refetch }) => {
  return (
    <div
      className="videoCard shadow"
      style={{ justifyContent: "space-between" }}
    >
      <ul>
        {data?.types?.split(",")?.map((e) => {
          return <p>{e}</p>;
        })}
      </ul>

      <div className="btnContainer">
        <button
          className="button"
          style={{ maxHeight: 40, maxWidth: 80, fontSize: 16 }}
          onClick={async () => {
            const res = await deleteOnboardingFileTypes(token, data.id, toast);
            refetch();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const Row = ({ data, type, deleteJob, deleteCompany }) => {
  const { token } = useContext(AuthContext);
  const [modalMenu, setModalMenu] = useState(false);

  const [interviewModal, setInterviewModal] = useState(false);
  const [onboardingModal, setOnboardingModal] = useState(false);
  const [onboardingModalType, setOnboardingModalType] = useState(null);
  const [employerOnboardingModal, setEmployerOnBoardingModal] = useState(false);
  const [expiryDateModal, setExpiryDateModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");

  const [expiryDate, setExpireDate] = useState("");
  const currDate = format(new Date(), "yMMdd");

  const {
    isError: filetypesError,
    isLoading: filetypesLoading,
    data: filetypes,
    refetch: filetypesRefetch,
  } = useQuery({
    queryKey: [`FileTypesByJob${data?.id}`, token, data?.id],
    queryFn: getOnboardingFileTypes,
    enabled: type === "EMPLOYER_ONBOARDING",
  });

  const {
    isError: videoError,
    isLoading: videoLoading,
    data: video,
  } = useQuery({
    queryKey: [`Video${data?.job?.id}`, data?.job?.id],
    queryFn: getOnbordingVideo,
    enabled: type === "EMPLOYEE_ONBOARDING",
  });

  const {
    isError: questionsError,
    isLoading: questionsLoading,
    data: questions,
  } = useQuery({
    queryKey: [`OnboardingQuestions${data?.job?.id}`, token, data?.job?.id],
    queryFn: getJobOnboardingQuestions,
    enabled: type === "EMPLOYEE_ONBOARDING",
  });

  //EMPLOYEE FUNCTIONS
  const HandleOnboardingQuestionsSubmit = async () => {
    let arr = [];
    for (let key in answers) {
      arr.push({ question: key, response_text: answers[key] });
    }

    if (arr.length !== questions.length) {
      toast("Answers all questions");
      return;
    }

    setLoading(true);
    const res = await postJobOnboardingQuestionResponse(
      token,
      data.job.id,
      arr,
      toast,
      setLoading
    );

    if (res === "SUCCESS") {
      setOnboardingModal(false);
    }
  };

  //EMPLOYER FUNCTIONS
  const HandleOnboardingFilesSubmit = async () => {
    setLoading(true);
    let req = { job: data.id, types: options.join(",") };
    const res = await postOnboardingFileTypes(token, req, toast, setLoading);
    setOptions([]);
    setOptionInput("");
    filetypesRefetch();
  };

  const HandleReopen = async () => {
    setLoading(true);
    const res = await patchJob(token, data.id, expiryDate, toast, setLoading);
    if (res === "SUCCESS") setExpiryDateModal(false);
  };

  return (
    <>
      <tbody>
        <tr>
          <td
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              whiteSpace: "nowrap",
            }}
          >
            {type === "COMPANY" ? (
              <>
                <img src={JobImage} class="avatar-lg" alt="Avatar" />
                <div>
                  <p>{data.name}</p>
                  <p style={{ color: "#000000bf", fontSize: 14 }}>
                    {`- ${data?.posted_by?.first_name} ${data?.posted_by?.last_name}`}
                  </p>
                </div>
              </>
            ) : (
              <>
                <img src={JobImage} class="avatar-lg" alt="Avatar" />
                <div>
                  <p>{data?.job?.title}</p>
                  <p style={{ color: "#000000bf", fontSize: 14 }}>
                    {`- ${data?.job?.posted_by?.first_name} ${data?.job?.posted_by?.last_name}`}
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 5,
                    marginLeft: 30,
                  }}
                >
                  <span class="mng-jb" style={{ margin: 0 }}>
                    {data?.job?.company?.name}
                  </span>
                  {!data.job?.is_active ? (
                    <p
                      class="mng-jb"
                      style={{ backgroundColor: "#fff", color: "red" }}
                    >
                      {"Not Approved"}
                    </p>
                  ) : null}
                </div>
              </>
            )}
          </td>

          {type === "COMPANY" ? (
            <td>
              <i class="ti-location-pin"></i>
              {`${data.country}`}
            </td>
          ) : (
            <td>
              <i class="ti-location-pin"></i>
              {data?.job?.country}
            </td>
          )}

          {type === "EMPLOYEE_APPLIED" ||
          type === "EMPLOYEE_ONBOARDING" ||
          type === "EMPLOYEE_INTERVIEW" ? (
            <td>{data.status === "ACCEPTED" ? "INTERVIEW" : data.status}</td>
          ) : null}

          <td
            style={{
              gap: 10,
              alignItems: "center",
              whiteSpace: "nowrap",
            }}
          >
            {type === "COMPANY" ? (
              <>
                <Link to={`/editcompany/${data.id}`}>
                  <ActionButton
                    text="Edit"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>

                <ActionButton
                  text="Delete"
                  type="outline"
                  handleClick={() => {
                    deleteCompany();
                  }}
                />
              </>
            ) : type === "EMPLOYEE_ONBOARDING" ? (
              <>
                <ActionButton
                  text="Video"
                  type="outline"
                  handleClick={() => {
                    setOnboardingModalType("VIDEO");
                    setOnboardingModal(true);
                  }}
                />

                <Link to={`/filesupload/${data.job.id}`}>
                  <ActionButton
                    text="Upload Files"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>

                <ActionButton
                  text="Questions"
                  type="outline"
                  handleClick={() => {
                    setOnboardingModalType("QUESTIONS");
                    setOnboardingModal(true);
                  }}
                />

                <Link to={`/dei/${data.job.id}`}>
                  <ActionButton
                    text="DEI"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>

                <Link to={`/deiquiz/${data.job.id}`}>
                  <ActionButton
                    text="DEI Quiz"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>
              </>
            ) : type === "EMPLOYEE_INTERVIEW" ? (
              <>
                <Link to={`/jobslots/${data?.job?.id}`}>
                  <ActionButton
                    text="Slots"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>
              </>
            ) : type === "EMPLOYER_ONBOARDING" ? (
              <>
                <Link to={`/onboardingquestions/${data?.job?.id}`}>
                  <ActionButton
                    text="Add Questions"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>

                <Link to={`/onboardingcandidates/${data?.job?.id}`}>
                  <ActionButton
                    text="View Candidates"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>

                <Link to={`/videoupload/${data?.job?.id}`}>
                  <ActionButton
                    text="Upload Video"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>

                <Link to={`/dei/${data?.job?.id}`}>
                  <ActionButton
                    text="DEI"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>

                <ActionButton
                  text="File Types"
                  type="outline"
                  handleClick={() => {
                    setEmployerOnBoardingModal(true);
                  }}
                />
              </>
            ) : type === "EMPLOYER_JOBS" ? (
              <>
                <Link to={`/job/${data.id}`}>
                  <ActionButton
                    text="View"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>

                <Link to={`/editjob/${data?.job?.id}`}>
                  <ActionButton
                    text="Edit"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>

                <Link to={`/jobquestions/${data?.job?.id}`}>
                  <ActionButton
                    text="Add Questions"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>

                <Link to={`/jobcandidates/${data?.job?.id}`}>
                  <ActionButton
                    text="View Candidates"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>

                <ActionButton
                  text="Delete"
                  type="outline"
                  handleClick={() => {
                    deleteJob();
                  }}
                />

                {parseInt(
                  data?.job?.expiry_date?.substring(0, 4) +
                    data?.job?.expiry_date?.substring(5, 7) +
                    data?.job?.expiry_date?.substring(8)
                ) < parseInt(currDate) ? (
                  <ActionButton
                    text="Reopen"
                    type="outline"
                    handleClick={() => {
                      setExpiryDateModal(true);
                    }}
                  />
                ) : null}
              </>
            ) : type === "EMPLOYER_INTERVIEW" ? (
              <>
                <Link to={`/slots/${data.job.id}`}>
                  <ActionButton
                    text="Slots"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>
                <Link to={`/slotcandidates/${data.job.id}`}>
                  <ActionButton
                    text="Candidates"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>
              </>
            ) : (
              <>
                <Link to={`/job/${data?.job?.id}`}>
                  <ActionButton
                    text="View"
                    type="outline"
                    handleClick={() => {}}
                  />
                </Link>
              </>
            )}
          </td>
        </tr>
      </tbody>

      <Modal modal={modalMenu} setModal={setModalMenu} fitContent>
        <div></div>
      </Modal>

      <PopupModal
        url="https://calendly.com/mrbureauu/test"
        onModalClose={() => setInterviewModal(false)}
        open={interviewModal}
        rootElement={document.getElementById("root")}
      />

      <Modal modal={expiryDateModal} setModal={setExpiryDateModal}>
        <div>
          <h3 style={{ paddingBottom: 20 }}>Reopen Job</h3>

          <div class="col-md-12 col-sm-6 col-xs-12 m-clear">
            <label>Expiry Date</label>
            <input
              type="date"
              class="form-control"
              onChange={(e) => {
                setExpireDate({
                  expiry_date: e.target.value,
                });
              }}
            />
            <button
              className="button"
              onClick={() => {
                HandleReopen();
              }}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        modal={employerOnboardingModal}
        setModal={setEmployerOnBoardingModal}
      >
        <>
          <SubHeading1 text="Upload File Types" />

          <div
            className="uploadFilesContainer"
            style={{ marginTop: 15, marginBottom: 15 }}
          >
            {filetypesLoading ? <Spinner /> : null}

            {!filetypesLoading && !filetypes.length ? (
              <h4>No File Types Uploaded</h4>
            ) : null}

            <div className="cardContainer">
              {filetypes?.map((e, index) => {
                return (
                  <FileCard data={e} token={token} refetch={filetypesRefetch} />
                );
              })}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              HandleOnboardingFilesSubmit();
            }}
            className="form"
          >
            <div>
              <label>Enter Options</label>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Option1"
                  value={optionInput}
                  onChange={(e) => {
                    setOptionInput(e.target.value);
                  }}
                />
                <button
                  className="button"
                  type="button"
                  style={{
                    maxWidth: 50,
                    maxHeight: 50,
                    marginLeft: 5,
                  }}
                  onClick={() => {
                    setOptions([...options, optionInput]);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>

            {options.map((e, index) => {
              return (
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 5,
                  }}
                >
                  <h4>{e}</h4>
                  <button
                    className="deleteBtn"
                    type="button"
                    onClick={() => {
                      let arr = [...options];
                      arr.splice(index, 1);
                      setOptions([...arr]);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              );
            })}

            <button type="submit" className="button">
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </>
      </Modal>

      <Modal modal={onboardingModal} setModal={setOnboardingModal}>
        {onboardingModalType === "VIDEO" ? (
          <div>
            <h3 style={{ paddingBottom: 20 }}>Videos</h3>

            {videoLoading ? <Spinner /> : null}

            {!videoLoading && !video.length ? (
              <h4>No videos uploaded</h4>
            ) : null}

            {video?.map((e, index) => {
              return (
                <a className="downloadBtn" href={`${e.video}`} target="_blank">
                  <li>{`Video ${index + 1}`}</li>
                </a>
              );
            })}
          </div>
        ) : (
          <>
            {questionsLoading ? <Spinner /> : null}

            {!questionsLoading && !questions.length ? (
              <h4>No questions posted</h4>
            ) : (
              <QuestionForm
                data={questions}
                answers={answers}
                setAnswers={setAnswers}
                loading={loading}
                handleSubmit={() => {
                  HandleOnboardingQuestionsSubmit();
                }}
              />
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default Row;
