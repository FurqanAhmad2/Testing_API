import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  BaseUrl,
  getDeiStatsByCandidateId,
  getJobOnboardingFiles,
  getJobOnboardingQuestionResponse,
} from "../../../apicalls";
import { AuthContext } from "../../../context/AuthContext";
import Modal from "../Modal/modal";
import Spinner from "../spinner";

const OnboardingCandidateCard = ({ data }) => {
  const { token } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const {
    isError: responseError,
    isLoading: responseLoading,
    data: response,
  } = useQuery({
    queryKey: [
      `QuestionOnboardingResponse${data.job.id}${data.employee.id}`,
      token,
      data.job.id,
      data.employee.id,
    ],
    queryFn: getJobOnboardingQuestionResponse,
  });

  const {
    isError: filesError,
    isLoading: filesLoading,
    data: files,
  } = useQuery({
    queryKey: [
      `Files${data.job.id}${data.employee.id}`,
      token,
      data.job.id,
      data.employee.id,
    ],
    queryFn: getJobOnboardingFiles,
  });

  return (
    <>
      <tbody>
        <tr>
          <td>{`${data.employee.first_name} ${data.employee.last_name}`}</td>

          <td style={{ display: "flex" }}>
            <button
              class="cl-success mrg-5"
              data-toggle="tooltip"
              data-original-title="Edit"
              onClick={() => {
                setModalType("FILES");
                setModal(true);
              }}
            >
              <p>View Files</p>
            </button>

            <button
              class="cl-success mrg-5"
              data-toggle="tooltip"
              data-original-title="Edit"
              onClick={() => {
                setModalType("RESPONSES");
                setModal(true);
              }}
            >
              <p>View Response</p>
            </button>

            <Link to={`/dei/${data.job.id}/${data.employee.id}`}>
              <button
                class="cl-success mrg-5"
                data-toggle="tooltip"
                data-original-title="Edit"
                onClick={() => {}}
              >
                <p>DEI Stats</p>
              </button>
            </Link>
          </td>
        </tr>
      </tbody>

      <Modal modal={modal} setModal={setModal}>
        {modalType === "FILES" ? (
          <div>
            <h3 style={{ paddingBottom: 20 }}>Files</h3>

            {filesLoading ? <Spinner /> : null}

            {!filesLoading && !files.length ? <h4>No files received</h4> : null}

            {files?.map((e, index) => {
              return (
                <a className="downloadBtn" href={`${e.file}`} target="_blank">
                  <li>{`File ${index + 1}`}</li>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="candicateCardModal">
            <h3>Responses</h3>
            {responseLoading ? <Spinner /> : null}

            {!responseLoading && !response.length ? (
              <h4>No response received</h4>
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
        )}
      </Modal>
    </>
  );
};

export default OnboardingCandidateCard;
