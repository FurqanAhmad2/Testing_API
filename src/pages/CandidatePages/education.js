import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import ScreenError from "../../components/common/ScreenError/screenError";
import { getEducation, postEducation } from "../../apicalls";
import EducationForm from "../../components/common/ProfileComponents/educationForm";
import Modal from "../../components/common/Modal/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "../../components/common/ActionButton/actionButton";
import EducationCard from "../../components/common/ProfileComponents/educationCard";
import Spinner from "../../components/common/spinner";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";

const InitialData = {
  education_type: "",
  starting_year: "",
  completion_year: "",
  starting_month: "",
  completion_month: "",
  ongoing: "",
  institute: "",
  cgpa: "",
};

const Education = () => {
  const { type, token } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(InitialData);

  const {
    isError: educationError,
    isLoading: educationLoading,
    data: educationData,
    refetch: refetchEducation,
  } = useQuery({
    queryKey: ["Education", token],
    queryFn: getEducation,
    enabled: type === "EMPLOYEE",
  });

  const HandleEducationSubmit = async () => {
    setLoading(true);
    const res = await postEducation(token, data, toast, setLoading);
    if (res === "SUCCESS") {
      setModal(false);
      refetchEducation();
      setData({ ...InitialData });
    }
  };

  if (educationLoading) return <ScreenLoading />;
  if (educationError) return <ScreenError />;

  return (
    <>
      <div className="profileBanner">
        <div className="bannerContent">
          <h1>Education</h1>
        </div>
      </div>

      <div className="profileMainContainer shadow">
        <div className="employeeDataContainer">
          {!educationData?.length ? (
            <h4 className="warningText">No education added</h4>
          ) : (
            <div className="experiencesCardContainer">
              {educationData?.map((e) => {
                return (
                  <EducationCard data={e} refetchEducation={refetchEducation} />
                );
              })}
            </div>
          )}

          <ActionButton
            text="Add Education"
            handleClick={() => {
              setModal(true);
            }}
          />
        </div>
      </div>

      <Modal modal={modal} setModal={setModal}>
        <div className="parsedContainer">
          <div className="header">
            <h3>Add Education</h3>
            <button
              onClick={() => {
                setModal(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <EducationForm
            education={data}
            setEducation={setData}
            handleSubmit={() => {
              HandleEducationSubmit();
            }}
            isEdit={false}
            loading={loading}
          />
        </div>
      </Modal>
    </>
  );
};

export default Education;
