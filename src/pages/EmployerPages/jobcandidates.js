import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getJobApplicants,
  getJobById,
  postJobApplicantStatus,
} from "../../apicalls";
import CandidateCard from "../../components/common/CandidateCard/candidateCard";
import Spinner from "../../components/common/spinner";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../../components/common/Modal/modal";

const Jobcandidates = () => {
  const { jobId } = useParams();
  const { token } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    isError: candidateError,
    isLoading: candidateLoading,
    data: allCandidates,
    refetch,
  } = useQuery({
    queryKey: [`AllCandidate${jobId}`, token, jobId],
    queryFn: getJobApplicants,
  });

  const HandleStatusChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await postJobApplicantStatus(
      token,
      { employee: modalDetails.id, job: jobId, status: modalDetails.status },
      toast,
      setLoading
    );
    refetch();
    setModal(false);
    setModalDetails(null);
  };

  const {
    isError: jobError,
    isLoading: jobLoading,
    data: job,
  } = useQuery({
    queryKey: [`JobId${jobId}`, token, jobId],
    queryFn: getJobById,
  });

  if (candidateLoading || jobLoading)
    return (
      <div className="loadingContainer">
        <Spinner />
      </div>
    );

  if (candidateError || jobError)
    return (
      <div className="loadingContainer">
        <h1>Error</h1>
      </div>
    );

  return (
    <div className="jobcandidatesContainer">
      <div className="content">
        <h2>{job.title}</h2>

        <div className="candidateList">
          <section class="utf_manage_jobs_area padd-top-20 padd-bot-20">
            <div class="container">
              <div class="table-responsive">
                <table class="table table-lg table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  {!allCandidates?.length ? <h3>No Candidates found</h3> : null}
                  {allCandidates?.map((e) => {
                    return (
                      <CandidateCard
                        data={e}
                        changeStatusFunc={() => {
                          setModalDetails({
                            status: e.status,
                            id: e.employee.id,
                          });
                          setModal(true);
                        }}
                      />
                    );
                  })}
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Modal modal={modal} setModal={setModal}>
        <form
          onSubmit={(e) => {
            HandleStatusChange(e);
          }}
          className="form"
          style={{ display: "grid", placeItems: "center" }}
        >
          <select
            className="loginInput"
            required
            onChange={(e) => {
              setModalDetails({ ...modalDetails, status: e.target.value });
            }}
            value={modalDetails?.status}
          >
            <option disabled selected value="">
              -- select status --
            </option>
            <option value="PENDING">PENDING</option>
            <option value="ACCEPTED">INTERVIEW</option>
            <option value="QUALIFIED">QUALIFIED</option>
            <option value="REJECTED">REJECTED</option>
          </select>

          <button type="submit" className="button" style={{ marginTop: 10 }}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Jobcandidates;
