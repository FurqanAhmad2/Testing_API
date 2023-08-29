import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { getJobApplications } from "../../apicalls";
import Heading1 from "../../components/common/Heading1/heading1";
import Row from "../../components/common/Row/row";
import Searchbar from "../../components/common/Searchbar/searchbar";
import { AuthContext } from "../../context/AuthContext";
import ScreenError from "../../components/common/ScreenError/screenError";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";
import Spinner from "../../components/common/spinner";

const JobRejected = () => {
  const { token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    isError,
    isLoading,
    data: jobs,
  } = useQuery({
    queryKey: [`JobApplied`, token],
    queryFn: getJobApplications,
  });

  useEffect(() => {
    if (searchTerm === "") {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setResult(
        jobs?.qualified?.filter(
          (job) =>
            job.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ===
            true
        )
      );

      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (isLoading) return <ScreenLoading />;
  if (isError) return <ScreenError />;

  return (
    <>
      <div className="dashboardHeader">
        <Heading1 text={"Rejected"} />
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
        <section class="utf_manage_jobs_area padd-top-20 padd-bot-20">
          {!jobs?.rejected?.length ? (
            <div className="zeroResultContainer">
              <h3>No rejected jobs</h3>
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
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    {result?.map((e) => {
                      return <Row data={e} type={"EMPLOYEE_REJECTED"} />;
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
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  {jobs.rejected.map((e) => {
                    return <Row data={e} type={"EMPLOYEE_REJECTED"} />;
                  })}
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default JobRejected;
