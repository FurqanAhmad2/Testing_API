import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteEducation,
  deleteExperience,
  patchEducation,
  patchExperience,
} from "../../../apicalls";
import { AuthContext } from "../../../context/AuthContext";
import Modal from "../Modal/modal";
import ExperienceForm from "./experienceForm";

const ExperienceCard = ({ data, refetchExperience }) => {
  const { token } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [experience, setExperience] = useState({
    job_title: "",
    company_name: "",
    starting_year: "",
    completion_year: "",
    starting_month: "",
    completion_month: "",
  });

  useEffect(() => {
    setExperience({
      ...experience,
      job_title: data.job_title,
      company_name: data.company_name,
      starting_year: data.starting_year,
      completion_year: data.completion_year,
      starting_month: data.starting_month,
      completion_month: data.completion_month,
    });
  }, [data]);

  const HandleExperienceEdit = async () => {
    setLoading(true);
    const res = await patchExperience(
      token,
      experience,
      data.id,
      toast,
      setLoading
    );
    if (res === "SUCCESS") {
      refetchExperience();
      setModal(false);
      window.location.reload();

    }
  };

  const HandleExperienceDelete = async () => {
    const res = await deleteExperience(token, data.id, toast);

    if (res === "SUCCESS") {
      refetchExperience();
      setModal(false);
      window.location.reload();
    }
  };

  return (
    <>
      <div className="educationCardContainer">
        <div>
          <h4>{data.company_name}</h4>
          <h5>{data.job_title}</h5>

          {data.starting_month &&
          data.starting_year &&
          data.completion_month &&
          data.completion_year ? (
            <p>{`${
              data.starting_month.charAt(0)?.toUpperCase() +
              data.starting_month?.slice(1).toLocaleLowerCase()
            }, ${data.starting_year} - ${
              data.completion_month.charAt(0)?.toUpperCase() +
              data.completion_month?.slice(1).toLocaleLowerCase()
            }, ${data.completion_year}`}</p>
          ) : null}
        </div>

        <button
          className="editBtn"
          onClick={() => {
            setModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>

      <Modal modal={modal} setModal={setModal}>
        <div className="parsedContainer">
          <div className="header">
            <h3>Edit Experience</h3>
            <button
              onClick={() => {
                setModal(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <ExperienceForm
            experience={experience}
            setExperience={setExperience}
            handleSubmit={() => {
              HandleExperienceEdit();
            }}
            handleDelete={() => {
              HandleExperienceDelete();
            }}
            isEdit={true}
            loading={loading}
          />
        </div>
      </Modal>
    </>
  );
};

export default ExperienceCard;
