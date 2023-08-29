import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { getCandidateResumes, getJobQuestionResponse } from "../../../apicalls";
import { AuthContext } from "../../../context/AuthContext";
import Modal from "../Modal/modal";
import Spinner from "../spinner";

const CandidateCard = ({ data, changeStatusFunc }) => {
  const { token } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [resume, setResume] = useState(null);

  const {
    isError: responseError,
    isLoading: responseLoading,
    data: response,
    refetch,
  } = useQuery({
    queryKey: [
      `QuestionResponse${data.job.id}${data.employee.id}`,
      token,
      data.job.id,
      data.employee.id,
    ],
    queryFn: getJobQuestionResponse,
  });

  const {
    isError: resumesError,
    isLoading: resumesLoading,
    data: resumes,
  } = useQuery({
    queryKey: [`CandidateResume${data.employee.id}`, token, data.employee.id],
    queryFn: getCandidateResumes,
  });

  useEffect(() => {
    if (resumes?.length) {
      resumes.forEach((e) => {
        if (e.id === data.resume) setResume(e.resume);
      });
    }
  }, [resumes]);

  return (
    <>
      <Modal modal={modal} setModal={setModal}>
        <div className="candicateCardModal">
          <h3>Responses</h3>

          {responseLoading ? <Spinner /> : null}

          {!responseLoading && !response.length ? (
            <h3>No response received</h3>
          ) : null}

          <ul className="responseContainer">
            {response?.map((e) => {
              return (
                <li>
                  <h4>{e.question.question_text}</h4>
                  <p>{e.response_text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Modal>

      <tbody>
        <tr>
          <td>{`${data.employee.first_name} ${data.employee.last_name}`}</td>

          <td>{data.status === "ACCEPTED" ? "INTERVIEW" : data.status}</td>

          <td style={{ display: "flex" }}>
            <button
              class="cl-success mrg-5"
              data-toggle="tooltip"
              data-original-title="Edit"
              onClick={() => {
                changeStatusFunc();
              }}
            >
              <p>Change Status</p>
            </button>

            <button
              class="cl-success mrg-5"
              data-toggle="tooltip"
              data-original-title="Edit"
              onClick={() => {
                setModal(true);
              }}
            >
              <p>View Responses</p>
            </button>

            {resume && (
              <a href={resume} target="_blank">
                <button
                  class="cl-success mrg-5"
                  data-toggle="tooltip"
                  data-original-title="Edit"
                  onClick={() => {}}
                >
                  <p>View Resume</p>
                </button>
              </a>
            )}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default CandidateCard;
