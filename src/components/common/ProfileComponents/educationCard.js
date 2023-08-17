import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteEducation, patchEducation } from "../../../apicalls";
import { AuthContext } from "../../../context/AuthContext";
import Modal from "../Modal/modal";
import EducationForm from "./educationForm";

const EducationCard = ({ data, refetchEducation }) => {
  const { token } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [education, setEducation] = useState({
    education_type: "",
    starting_year: "",
    completion_year: "",
    starting_month: "",
    completion_month: "",
    ongoing: "",
    institute: "",
    cgpa: "",
  });

  useEffect(() => {
    setEducation({
      ...education,
      education_type: data.education_type,
      starting_year: data.starting_year,
      completion_year: data.completion_year,
      starting_month: data.starting_month,
      completion_month: data.completion_month,
      ongoing: data.ongoing,
      institute: data.institute,
      cgpa: data.cgpa,
    });
  }, [data]);

  const HandleEducationEdit = async () => {
    setLoading(true);
    const res = await patchEducation(
      token,
      education,
      data.id,
      toast,
      setLoading
    );
    if (res === "SUCCESS") {
      refetchEducation();
      setModal(false);
    }
  };

  const HandleEducationDelete = async () => {
    const res = await deleteEducation(token, data.id, toast);

    if (res === "SUCCESS") {
      refetchEducation();
      setModal(false);
    }
  };

  return (
    <>
      <div className="educationCardContainer">
        <div>
          <h4>{data.institute}</h4>

          {data.education_type ? <p>{data.education_type}</p> : null}

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
            <h3>Edit Education</h3>
            <button
              onClick={() => {
                setModal(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <EducationForm
            education={education}
            setEducation={setEducation}
            handleSubmit={() => {
              HandleEducationEdit();
            }}
            handleDelete={() => {
              HandleEducationDelete();
            }}
            isEdit={true}
            loading={loading}
          />
        </div>
      </Modal>
    </>
  );
};

export default EducationCard;
