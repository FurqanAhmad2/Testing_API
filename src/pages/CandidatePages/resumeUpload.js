import {
  faCloudArrowUp,
  faDownload,
  faEye,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "../../context/AuthContext";
import {
  BaseUrl,
  deleteResume,
  getResumes,
  postParsedData,
  postResume,
} from "../../apicalls";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Resume from "../../components/common/resumeCard";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal/modal";
import Heading1 from "../../components/common/Heading1/heading1";
import SubHeading1 from "../../components/common/SubHeading1/subHeading1";

const ResumeUpload = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [choice, setChoice] = useState(null);
  // const [parsedData, setParsedData] = useState(null);
  const [experienceData, setExperienceData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [parsedSubmitLoading, setParsedSubmitLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "application/pdf": [".pdf"],
        "application/docx": [".pdf", ".docx", ".txt"],
      },
    });

  const {
    isLoading: resumeLoading,
    data: resumes,
    refetch,
  } = useQuery({
    queryKey: ["EmployeeResumes", token],
    queryFn: getResumes,
  });

  const DeleteResume = async (id) => {
    const res = await deleteResume(token, id, toast);
    if (res === "SUCCESS") refetch();
  };

  const HandleParsedData = (parsedData) => {
    if (parsedData?.college_name?.length) {
      let list = [];
      for (let i = 0; i < parsedData.college_name.length; i++) {
        list = [
          ...list,
          {
            institute: parsedData.college_name[i],
            education_type: parsedData.degree?.length
              ? !!parsedData.degree[i]
                ? parsedData.degree[i]
                : ""
              : "",
          },
        ];
      }
      setEducationData(list.splice(0, 5));
    }

    if (parsedData?.company_names?.length) {
      let list = [];
      for (let i = 0; i < parsedData.company_names.length; i++) {
        list = [
          ...list,
          {
            company_name: parsedData.company_names[i],
            job_title: parsedData.designation?.length
              ? !!parsedData.designation[i]
                ? parsedData.designation[i]
                : ""
              : "",
          },
        ];
      }
      setExperienceData(list.splice(0, 5));
    }

    if (parsedData?.skills?.length) {
      const set = [...new Set(parsedData.skills)];
      let skillsList = [];
      for (let i = 0; i < set.length; i++) {
        skillsList.push({
          description: set[i],
          skill_level: "BEGINNER",
          year_of_experience: "1",
        });
      }
      setSkillData([...skillsList]);
    }
  };

  useEffect(() => {
    if (educationData.length || experienceData.length || skillData.length) {
      setModal(true);
      setChoice(1);
    }
  }, [educationData, experienceData, skillData]);

  const HandleParseDataSubmit = async () => {
    setParsedSubmitLoading(true);
    if (!educationData.length && !experienceData.length && !skillData.length) {
      setModal(false);
      setChoice(null);
      setEducationData([]);
      setExperienceData([]);
      setSkillData([]);
      return;
    }

    const res = await postParsedData(
      token,
      educationData,
      experienceData,
      skillData,
      toast,
      setParsedSubmitLoading
    );

    if (res === "SUCCESS") {
      setModal(false);
      setChoice(null);
      setEducationData([]);
      setExperienceData([]);
      setSkillData([]);
      navigate("/profile");
    }
  };

  return (
    <>
      <div className="resumeUploadContainer">
        <Heading1 text="Upload Your Resume" />
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div
            className={`dropzoneContent ${
              isDragActive ? "dropActive" : "dropInactive"
            }`}
          >
            {isDragActive ? (
              <p>Drop your Resume here ...</p>
            ) : acceptedFiles.length && acceptedFiles[0] ? (
              <p>{acceptedFiles[0].path}</p>
            ) : (
              <p>Drag 'n' drop your Resume, or click to select Resume</p>
            )}
          </div>
        </div>

        <button
          className="button"
          onClick={async () => {
            if (acceptedFiles.length) {
              setisLoading(true);
              const res = await postResume(
                acceptedFiles[0],
                token,
                toast,
                setisLoading
              );
              console.log(res);
              HandleParsedData(res);
              refetch();
            } else {
              toast("Select a single PDF file");
            }
          }}
        >
          <FontAwesomeIcon icon={faCloudArrowUp} />
          <p>{isLoading ? "Loading..." : "Upload"}</p>
        </button>
      </div>

      <div className="resumeContainerUpload">
        <SubHeading1 text="Resumes" />
        {!resumes?.length ? (
          <h1>No resumes added</h1>
        ) : (
          <div className="resumeCardContainer">
            {resumes?.map((e, index) => {
              return (
                <Resume
                  index={index}
                  e={e}
                  deleteFunc={() => {
                    DeleteResume(e.id);
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      <Modal modal={modal}>
        <div className="parsedContainer">
          {choice === 1 ? (
            <>
              <h4>
                Do you want to upload your education, experience and skills from
                resume?
              </h4>

              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button
                  className="button"
                  onClick={() => {
                    setChoice(2);
                  }}
                >
                  Accept
                </button>
                <button
                  className="button"
                  onClick={() => {
                    setModal(false);
                    setChoice(null);
                    setEducationData([]);
                    setExperienceData([]);
                    setSkillData([]);
                  }}
                >
                  Cancel
                </button>
              </div>

              {/* <div className="header">
                <button
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
               <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    educationData.length ||
                    experienceData.length ||
                    skillData.length
                  )
                    HandleParseDataSubmit();
                  else setModal(false);
                }}
              >
                {educationData.length ? (
                  <>
                    <h4>Educations List</h4>
                    {educationData.map((e, index) => {
                      return (
                        <>
                          <div className="subheader">
                            <h5>{`Education ${index + 1}`}</h5>
                            <button
                              className="deleteButton"
                              onClick={() => {
                                const arr = [...educationData];
                                arr.splice(index, 1);
                                setEducationData([...arr]);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                          <div class="inputContainers">
                            <label>Institute</label>
                            <input
                              type="text"
                              class="form-control"
                              value={e.institute}
                              placeholder="ABC Academy"
                              required
                              onChange={(e) => {
                                const arr = [...educationData];
                                arr.splice(index, 1, {
                                  ...arr[index],
                                  institute: e.target.value,
                                });
                                setEducationData([...arr]);
                              }}
                            />
                          </div>

                          <div class="inputContainers">
                            <label>Degree</label>
                            <input
                              type="text"
                              class="form-control"
                              value={e.education_type}
                              placeholder="Bachelors"
                              required
                              onChange={(e) => {
                                const arr = [...educationData];
                                arr.splice(index, 1, {
                                  ...arr[index],
                                  education_type: e.target.value,
                                });
                                setEducationData([...arr]);
                              }}
                            />
                          </div>

                          <div class="inputContainers">
                            <label>Starting Year</label>
                            <input
                              type="text"
                              class="form-control"
                              value={e.starting_year}
                              placeholder="2020"
                              onChange={(e) => {
                                const arr = [...educationData];
                                arr.splice(index, 1, {
                                  ...arr[index],
                                  starting_year: e.target.value,
                                });
                                setEducationData([...arr]);
                              }}
                            />
                          </div>

                          <div class="inputContainers">
                            <label>Ending Year</label>
                            <input
                              type="text"
                              class="form-control"
                              value={e.completion_year}
                              placeholder="2025"
                              onChange={(e) => {
                                const arr = [...educationData];
                                arr.splice(index, 1, {
                                  ...arr[index],
                                  completion_year: e.target.value,
                                });
                                setEducationData([...arr]);
                              }}
                            />
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : null}
                {experienceData.length ? (
                  <>
                    <h4>Experiences List</h4>
                    {experienceData.map((e, index) => {
                      return (
                        <>
                          <div className="subheader">
                            <h5>{`Experience ${index + 1}`}</h5>
                            <button
                              className="deleteButton"
                              onClick={() => {
                                const arr = [...experienceData];
                                arr.splice(index, 1);
                                setExperienceData([...arr]);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>

                          <div class="inputContainers">
                            <label>Company Name</label>
                            <input
                              type="text"
                              class="form-control"
                              value={e.company_name}
                              placeholder="Infotech Pvt Ltd"
                              required
                              onChange={(e) => {
                                const arr = [...experienceData];
                                arr.splice(index, 1, {
                                  ...arr[index],
                                  company_name: e.target.value,
                                });
                                setExperienceData([...arr]);
                              }}
                            />
                          </div>

                          <div class="inputContainers">
                            <label>Designation</label>
                            <input
                              type="text"
                              class="form-control"
                              value={e.job_title}
                              placeholder="App Developer"
                              required
                              onChange={(e) => {
                                const arr = [...experienceData];
                                arr.splice(index, 1, {
                                  ...arr[index],
                                  job_title: e.target.value,
                                });
                                setExperienceData([...arr]);
                              }}
                            />
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : null}
                {skillData.length ? (
                  <>
                    <h4>Skills List</h4>

                    <div className="skillsContainer">
                      {skillData.map((e, index) => {
                        let isInclude = selectedSkills.includes(e);
                        return (
                          <button
                            type="button"
                            className={
                              isInclude
                                ? `skillAddbutton shadow selected`
                                : `skillAddbutton shadow`
                            }
                            onClick={() => {
                              const index = selectedSkills.indexOf(e);
                              console.log(index);
                              if (index === -1)
                                setSelectedSkills([...selectedSkills, e]);
                              else {
                                let arr = [...selectedSkills];
                                arr.splice(index, 1);
                                console.log(arr);
                                setSelectedSkills([...arr]);
                              }
                            }}
                          >
                            <p>{e}</p>
                            <FontAwesomeIcon
                              icon={isInclude ? faXmark : faPlus}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : null}

                {!educationData.length &&
                !experienceData.length &&
                !skillData.length ? (
                  <h4 style={{ textAlign: "center" }}>No data found</h4>
                ) : null}

                <button className="button" type="submit">
                  {parsedSubmitLoading ? "Loading..." : "Submit"}
                </button>
              </form> */}
            </>
          ) : (
            <>
              <h4>
                There might be a chance that system has missed some data to
                import from your resume, please go to your profile section and
                check & edit it accordingly.
              </h4>

              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button
                  className="button"
                  onClick={() => {
                    HandleParseDataSubmit();
                  }}
                >
                  {parsedSubmitLoading ? "Loading..." : "Upload"}
                </button>
                <button
                  className="button"
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ResumeUpload;
