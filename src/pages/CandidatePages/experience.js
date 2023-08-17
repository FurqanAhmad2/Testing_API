import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import ScreenError from "../../components/common/ScreenError/screenError";
import { getExperience, postExperience } from "../../apicalls";
import Modal from "../../components/common/Modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "../../components/common/ActionButton/actionButton";
import Spinner from "../../components/common/spinner";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";
import ExperienceCard from "../../components/common/ProfileComponents/experienceCard";
import ExperienceForm from "../../components/common/ProfileComponents/experienceForm";

const InitialData = {
  job_title: "",
  company_name: "",
  starting_year: "",
  completion_year: "",
  starting_month: "",
  completion_month: "",
};

const Experience = () => {
  const { type, token } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(InitialData);

  const {
    isError: experienceError,
    isLoading: experienceLoading,
    data: experienceData,
    refetch: refetchExperience,
  } = useQuery({
    queryKey: ["Experience", token],
    queryFn: getExperience,
    enabled: type === "EMPLOYEE",
  });

  const HandleExperienceSubmit = async () => {
    setLoading(true);
    const res = await postExperience(token, data, toast, setLoading);
    if (res === "SUCCESS") {
      setModal(null);
      refetchExperience();
    }
  };
  if (experienceLoading) return <ScreenLoading />;
  if (experienceError) return <ScreenError />;

  return (
    <>
      <div className="profileBanner">
        <div className="bannerContent">
          <h1>Experience</h1>
        </div>
      </div>

      <div className="profileMainContainer shadow">
        <div className="employeeDataContainer">
          {!experienceData?.length ? (
            <h4 className="warningText">No experience added</h4>
          ) : (
            <div className="experiencesCardContainer">
              {experienceData?.map((e) => {
                return (
                  <ExperienceCard
                    data={e}
                    refetchExperience={refetchExperience}
                  />
                );
              })}
            </div>
          )}

          <ActionButton
            text="Add Experience"
            handleClick={() => {
              setModal(true);
            }}
          />
        </div>
      </div>

      <Modal modal={modal} setModal={setModal}>
        <div className="parsedContainer">
          <div className="header">
            <h3>Add Experience</h3>

            <button
              onClick={() => {
                setModal(null);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <ExperienceForm
            experience={data}
            setExperience={setData}
            handleSubmit={() => {
              HandleExperienceSubmit();
            }}
            isEdit={false}
            loading={loading}
          />
        </div>
      </Modal>
    </>
  );
};

export default Experience;
