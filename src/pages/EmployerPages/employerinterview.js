import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteJob,
  getCategories,
  getCompanies,
  getJobPosts,
  getPostedJobsByFilter,
} from "../../apicalls";
import Heading1 from "../../components/common/Heading1/heading1";
import Row from "../../components/common/Row/row";
import Searchbar from "../../components/common/Searchbar/searchbar";
import Spinner from "../../components/common/spinner";
import SubHeading1 from "../../components/common/SubHeading1/subHeading1";
import { AuthContext } from "../../context/AuthContext";
import ScreenError from "../../components/common/ScreenError/screenError";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";
import { Link } from "react-router-dom";
import ActionButton from "../../components/common/ActionButton/actionButton";
import ScreenPermissionError from "../../components/common/ScreenPermissionError/screenPermissionError";

const PostedJob = () => {
  const { token, subscriptionDetails } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    isError: jobsError,
    isLoading: jobsLoading,
    data: jobs,
    refetch,
  } = useQuery({
    queryKey: [`AllJobsPosted`, token],
    queryFn: getJobPosts,
    enabled:
      subscriptionDetails?.permissionIdList?.includes(9) ||
      subscriptionDetails?.permissionIdList?.includes(6),
  });

  useEffect(() => {
    if (searchTerm === "") {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setResult(
        jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) === true
        )
      );

      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (
    subscriptionDetails?.permissionIdList?.includes(9) ||
    subscriptionDetails?.permissionIdList?.includes(6)
  ) {
    if (jobsLoading) return <ScreenLoading />;
    if (jobsError) return <ScreenError />;

    return (
      <>
        <div className="dashboardHeader">
          <Heading1 text={"Interview"} />
        </div>

        <div className="jobAppliedContainer">
          <div className="jobAppliedContent">
            <div className="searchbarContainer">
              <Searchbar
                searchterm={searchTerm}
                setSearchterm={setSearchTerm}
                placeholder={"Search..."}
                handleSubmit={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="tableContainer paddingHorizontal paddingTop">
          <section class="utf_manage_jobs_area">
            {!jobs?.length ? (
              <div className="zeroResultContainer">
                <h3>No Jobs found</h3>
              </div>
            ) : loading ? (
              <Spinner />
            ) : searchTerm ? (
              result.length ? (
                <div class="container">
                  <div class="table-responsive">
                    <table class="table table-lg table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Location</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      {result.map((e) => {
                        return (
                          <Row
                            data={{ id: e.id, job: e }}
                            type={"EMPLOYER_INTERVIEW"}
                          />
                        );
                      })}
                    </table>
                  </div>
                </div>
              ) : (
                <div className="zeroResultContainer">
                  <h3>No Jobs Found</h3>
                </div>
              )
            ) : (
              <div class="container">
                <div class="table-responsive">
                  <table class="table table-lg table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    {jobs?.map((e) => {
                      return (
                        <Row
                          data={{ id: e.id, job: e }}
                          type={"EMPLOYER_INTERVIEW"}
                        />
                      );
                    })}
                  </table>
                </div>
              </div>
            )}
          </section>
        </div>
      </>
    );
  } else return <ScreenPermissionError />;
};

export default PostedJob;
