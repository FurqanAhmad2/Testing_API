import {
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteSkill, patchSkill } from "../../../apicalls";
import { AuthContext } from "../../../context/AuthContext";
import Modal from "../Modal/modal";
import SkillForm from "./skillForm";
import Spinner2 from "../spinner2";

const SkillCard = ({ data, refetchSkill }) => {
  const { token } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [skill, setSkill] = useState({
    description: "",
    skill_level: "",
    year_of_experience: "",
  });

  useEffect(() => {
    setSkill({
      ...skill,
      description: data.description,
      skill_level: data.skill_level,
      year_of_experience: data.year_of_experience,
    });
  }, [data]);

  const HandleSkillEdit = async () => {
    setLoading(true);
    const res = await patchSkill(token, skill, data.id, toast, setLoading);
    if (res === "SUCCESS") {
      refetchSkill();
      setModal(false);
    }
  };

  const HandleSkillDelete = async () => {
    setDeleteLoading(true);
    const res = await deleteSkill(token, data.id, toast);

    if (res === "SUCCESS") {
      refetchSkill();
      setModal(false);
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="educationCardContainer">
        <div>
          <h4>{data.description}</h4>
          <p>{data.skill_level}</p>
          <p>{`Experience ${data.year_of_experience} years`}</p>
        </div>

        <div style={{ width: 40, fontSize: 16 }}>
          <button
            className="editBtn"
            onClick={() => {
              setModal(true);
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>

          <button
            className="editBtn2"
            onClick={() => {
              HandleSkillDelete();
            }}
          >
            {deleteLoading ? <Spinner2 /> : <FontAwesomeIcon icon={faTrash} />}
          </button>
        </div>
      </div>

      <Modal modal={modal} setModal={setModal}>
        <div className="parsedContainer">
          <div className="header">
            <h3>Edit Skill</h3>
            <button
              onClick={() => {
                setModal(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <SkillForm
            skill={skill}
            setSkill={setSkill}
            handleSubmit={() => {
              HandleSkillEdit();
            }}
            handleDelete={() => {
              HandleSkillDelete();
            }}
            isEdit={true}
            loading={loading}
          />
        </div>
      </Modal>
    </>
  );
};

export default SkillCard;
