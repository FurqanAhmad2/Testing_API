import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "../../context/AuthContext";
import {
  BaseUrl,
  getJobOnboardingFiles,
  getOnboardingFileTypes,
  postJobOnboardingFile,
  postResume,
} from "../../apicalls";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/common/spinner";
import Modal from "../../components/common/Modal/modal";
import SubHeading1 from "../../components/common/SubHeading1/subHeading1";

const FilesUpload = () => {
  const { token, profile } = useContext(AuthContext);
  const { jobId } = useParams();
  const [modal, setModal] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);

  const [isLoading, setisLoading] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
    });

  const {
    isError: filetypesError,
    isLoading: filetypesLoading,
    data: filetypes,
  } = useQuery({
    queryKey: [`FileTypesByJob${jobId}`, token, jobId],
    queryFn: getOnboardingFileTypes,
  });

  const {
    isError: filesError,
    isLoading: filesLoading,
    data: files,
    refetch,
  } = useQuery({
    queryKey: [`Files${jobId}${profile.id}`, token, jobId, profile.id],
    queryFn: getJobOnboardingFiles,
  });

  const FileCard = ({ data }) => {
    return (
      <div className="videoCard shadow">
        <h4>
          {data.file
            .substring(0, data.file.indexOf("?"))
            .substring(
              data.file.substring(0, data.file.indexOf("?")).lastIndexOf("/") +
                1
            )}
        </h4>

        <div className="btnContainer">
          <a
            className="downloadBtn"
            href={`${BaseUrl}${data.file}`}
            target="_blank"
          >
            <button
              className="button"
              style={{ maxHeight: 40, maxWidth: 80, fontSize: 16 }}
            >
              View
            </button>
          </a>
        </div>
      </div>
    );
  };

  const FileTypeCard = ({ data, index }) => {
    return (
      <div
        className="videoCard shadow"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <ul>
          {data?.types?.split(",")?.map((e) => {
            return <h5>{e}</h5>;
          })}
        </ul>

        <div className="btnContainer">
          <button
            className="button"
            style={{ maxHeight: 40, maxWidth: 80, fontSize: 16 }}
            onClick={() => {
              setModalDetails(data);
              setModal(true);
            }}
          >
            Upload
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="resumeUploadContainer">
      <SubHeading1 text="Upload Your File" />

      <div className="uploadFilesContainer" style={{ marginTop: 40 }}>
        {filetypesLoading ? <Spinner /> : null}

        {!filetypesLoading && !filetypes.length ? (
          <h4>No File Types Uploaded</h4>
        ) : null}

        <div className="cardContainer">
          {filetypes?.map((e) => {
            return <FileTypeCard data={e} />;
          })}
        </div>
      </div>

      <Modal modal={modal} setModal={setModal}>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div
            className={`dropzoneContent ${
              isDragActive ? "dropActive" : "dropInactive"
            }`}
          >
            {isDragActive ? (
              <p>Drop your File here ...</p>
            ) : acceptedFiles.length && acceptedFiles[0] ? (
              <p>{acceptedFiles[0].path}</p>
            ) : (
              <p>Drag 'n' drop your File, or click to select File</p>
            )}
          </div>
        </div>

        <button
          className="button"
          style={{ margin: "0 auto" }}
          onClick={async () => {
            if (acceptedFiles.length) {
              setisLoading(true);
              const res = await postJobOnboardingFile(
                acceptedFiles[0],
                jobId,
                modalDetails.id,
                token,
                toast,
                setisLoading
              );
              setModal(false);
              setModalDetails(null);
              refetch();
            } else {
              toast("Select a single file");
            }
          }}
        >
          <FontAwesomeIcon icon={faCloudArrowUp} />
          <p>{isLoading ? "Loading..." : "Upload"}</p>
        </button>
      </Modal>

      <div className="uploadFilesContainer" style={{ marginTop: 40 }}>
        <SubHeading1 text="Files Uploaded" />

        {filesLoading ? <Spinner /> : null}

        {!filesLoading && !files.length ? <h4>No Files Uploaded</h4> : null}

        <div className="cardContainer" style={{ marginTop: 20 }}>
          {files?.map((e) => {
            return <FileCard data={e} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default FilesUpload;
