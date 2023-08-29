import { Modal } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getJobApplicants,
  getJobById,
  getJobOnboardingApplicants,
  postJobApplicantStatus,
} from "../../apicalls";
import CandidateCard from "../../components/common/CandidateCard/candidateCard";
import OnboardingCandidateCard from "../../components/common/OnboardingCandidateCard/onboardingCandidateCard";
import Spinner from "../../components/common/spinner";
import { AuthContext } from "../../context/AuthContext";

const Onboardingcandidates = () => {
  const { jobId } = useParams();
  const { token } = useContext(AuthContext);

  const {
    isError: candidateError,
    isLoading: candidateLoading,
    data: allCandidates,
    refetch,
  } = useQuery({
    queryKey: [`OnboardingCandidate${jobId}`, token, jobId],
    queryFn: getJobOnboardingApplicants,
  });

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
                      <th>Action</th>
                    </tr>
                  </thead>

                  {!allCandidates?.length ? <h3>No Candidates found</h3> : null}
                  {allCandidates?.map((e) => {
                    return <OnboardingCandidateCard data={e} />;
                  })}
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Onboardingcandidates;
