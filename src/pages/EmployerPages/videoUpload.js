import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "../../context/AuthContext";
import {
  deleteJobOnboardingVideo,
  getOnbordingVideo,
  postJobOnboardingVideo,
  postResume,
} from "../../apicalls";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/common/spinner";

const VideoUpload = () => {
  const { token } = useContext(AuthContext);
  const { jobId } = useParams();
  const [isLoading, setisLoading] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "video/mp4": [".mp4"],
      },
      maxSize: 10485760,
      onDropRejected: (e) => {
        e.forEach((file) => {
          file.errors.forEach((err) => {
            if (err.code === "file-too-large") {
              toast(`File is larger than 10MB`);
            }

            if (err.code === "file-invalid-type") {
              toast(`Error: ${err.message}`);
            }
          });
        });
      },
    });

  const {
    isError: videoError,
    isLoading: videoLoading,
    data: video,
    refetch,
  } = useQuery({
    queryKey: [`Video${jobId}`, jobId],
    queryFn: getOnbordingVideo,
  });

  const VideoCard = ({ data }) => {
    return (
      <div className="videoCard shadow">
        <h4>
          {data.video
            .substring(0, data.video.indexOf("?"))
            .substring(
              data.video
                .substring(0, data.video.indexOf("?"))
                .lastIndexOf("/") + 1
            )}
        </h4>

        <div className="btnContainer">
          <a className="downloadBtn" href={`${data.video}`} target="_blank">
            <button
              className="button"
              style={{ maxHeight: 40, maxWidth: 80, fontSize: 16 }}
            >
              View
            </button>
          </a>

          <button
            className="button"
            style={{ maxHeight: 40, maxWidth: 80, fontSize: 16 }}
            onClick={async () => {
              const res = await deleteJobOnboardingVideo(token, data.id, toast);
              refetch();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="resumeUploadContainer">
      <h2>Upload Video</h2>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div
          className={`dropzoneContent ${
            isDragActive ? "dropActive" : "dropInactive"
          }`}
        >
          {isDragActive ? (
            <p>Drop your Video here ...</p>
          ) : acceptedFiles.length && acceptedFiles[0] ? (
            <p>{acceptedFiles[0].path}</p>
          ) : (
            <p>Drag 'n' drop your Video, or click to select Video</p>
          )}
        </div>
      </div>

      <button
        className="button"
        onClick={async () => {
          if (acceptedFiles.length) {
            setisLoading(true);
            const res = await postJobOnboardingVideo(
              acceptedFiles[0],
              jobId,
              token,
              toast,
              setisLoading
            );
            refetch();
          } else {
            toast("Select a single .mp4 file");
          }
        }}
      >
        <FontAwesomeIcon icon={faCloudArrowUp} />
        <p>{isLoading ? "Loading..." : "Upload"}</p>
      </button>

      <div className="uploadFilesContainer">
        <h3>Videos Uploaded</h3>
        {videoLoading ? <Spinner /> : null}

        {!videoLoading && !video.length ? <h4>No Videos Uploaded</h4> : null}

        <div className="cardContainer">
          {video?.map((e) => {
            return <VideoCard data={e} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
