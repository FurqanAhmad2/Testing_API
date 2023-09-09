import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import ScreenError from "../../components/common/ScreenError/screenError";
import { getSkill, postSkill } from "../../apicalls";
import Modal from "../../components/common/Modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "../../components/common/ActionButton/actionButton";
import Spinner from "../../components/common/spinner";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";
import SkillCard from "../../components/common/ProfileComponents/skillCard";
import SkillForm from "../../components/common/ProfileComponents/skillForm";

const InitialData = {
  description: "",
  skill_level: "",
  year_of_experience: "",
};

const Skill = () => {
  const { type, token } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(InitialData);

  const {
    isError: skillError,
    isLoading: skillLoading,
    data: skillData,
    refetch: refetchSkill,
  } = useQuery({
    queryKey: ["Skill", token],
    queryFn: getSkill,
  });

  const HandleSkillSubmit = async () => {
    setLoading(true);
    const res = await postSkill(token, data, toast, setLoading);
    if (res === "SUCCESS") {
      setModal(null);
      refetchSkill();
      window.location.reload();

    }
  };

  if (skillLoading) return <ScreenLoading />;
  if (skillError) return <ScreenError />;

  return (
    <>
      <div className="profileBanner">
        <div className="bannerContent">
          <h1>Skill</h1>
        </div>
      </div>

      <div className="profileMainContainer shadow">
        <div className="employeeDataContainer">
          {!skillData?.length ? (
            <h4 className="warningText">No skills added</h4>
          ) : (
            <div className="skillsCardContainer">
              {skillData?.map((e) => {
                return <SkillCard data={e} refetchSkill={refetchSkill} />;
              })}
            </div>
          )}

          <ActionButton
            text="Add Skill"
            handleClick={() => {
              setModal(true);
            }}
          />
        </div>
      </div>

      <Modal modal={modal} setModal={setModal}>
        <div className="parsedContainer">
          <div className="header">
            <h3>Add Skill</h3>

            <button
              onClick={() => {
                setModal(null);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <SkillForm
            skill={data}
            setSkill={setData}
            handleSubmit={() => {
              HandleSkillSubmit();
            }}
            isEdit={false}
            loading={loading}
          />
        </div>
      </Modal>
    </>
  );
};

export default Skill;
