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
import useWindow from "../../hooks/useWindow";

const PostedJob = () => {
  const { width } = useWindow();
  const { token, profile } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFields, setFilterFields] = useState({});
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    isError: jobsError,
    isLoading: jobsLoading,
    data: jobs,
    refetch,
  } = useQuery({
    queryKey: [`AllJobsPosted`, token],
    queryFn: getJobPosts,
  });

  const {
    isError: categoriesError,
    isLoading: categoriesLoading,
    data: allCategories,
  } = useQuery({
    queryKey: [`AllCategories`],
    queryFn: getCategories,
  });

  const {
    isError: companyError,
    isLoading: companyLoading,
    data: allCompany,
  } = useQuery({
    queryKey: [`AllCompanies`, token],
    queryFn: getCompanies,
  });
  console.log(filteredJobs);
  useEffect(() => {
    const func = async () => {
      setFilteredJobs([]);

      let str = "";
      if (Object.keys(filterFields).length) {
        let keys = Object.keys(filterFields);

        keys.forEach((key) => {
          if (filterFields[key]) str = str + `${key}=${filterFields[key]}&`;
        });
      }

      let searchString = str;
      searchString =
        searchString.substring(0, searchString.length - 1) +
        `search=${searchTerm}`;

      console.log(searchString);
      setLoading(true);
      const res = await getPostedJobsByFilter(token, searchString, setLoading);
      setFilteredJobs(res);
    };

    const timer = setTimeout(() => {
      if (Object.keys(filterFields).length || searchTerm.length) func();
    }, 500);
    return () => clearTimeout(timer);
  }, [filterFields, searchTerm]);

  const HandleDelete = async (id) => {
    const res = await deleteJob(token, id, toast);
    refetch();
  };

  if (jobsLoading || categoriesLoading || companyLoading)
    return <ScreenLoading />;
  if (jobsError || categoriesError || companyError) return <ScreenError />;

  return (
    <>
      <div className="dashboardHeader">
        <Heading1 text={"Posted Jobs"} />
      </div>

      <div className="jobSearchContainer">
        <div className="candidateSearchContent">
          {width < 700 && (
            <div class="searchcontainer">
              <Searchbar
                searchterm={searchTerm}
                setSearchterm={setSearchTerm}
                placeholder={"Job Title, Keywords or Company Name..."}
                handleSubmit={() => {}}
              />
            </div>
          )}
          <div className="filterContainer">
            <div className="widget-boxed padd-bot-0 mar-bot-0">
              <div
                className="widget-boxed-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4>Company</h4>
              </div>

              <select
                class="form-control"
                value={filterFields.company || ""}
                onChange={(e) => {
                  setFilterFields({
                    ...filterFields,
                    company: e.target.value,
                  });
                }}
              >
                <option disabled selected value="">
                  -- select a company --
                </option>
                {allCompany?.map((e) => {
                  return <option value={e.id}>{e.name}</option>;
                })}
              </select>
            </div>

            <div className="widget-boxed padd-bot-0 mar-bot-0">
              <div
                className="widget-boxed-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4>Category</h4>
              </div>

              <select
                class="form-control"
                value={filterFields.category || ""}
                onChange={(e) => {
                  setFilterFields({
                    ...filterFields,
                    category: e.target.value,
                  });
                }}
              >
                <option disabled selected value="">
                  -- select a category --
                </option>
                {allCategories?.map((e) => {
                  return <option value={e.id}>{e.name}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="tableContainer">
            {width > 700 && (
              <div className="searchContainer" style={{ paddingBottom: 20 }}>
                <Searchbar
                  searchterm={searchTerm}
                  setSearchterm={setSearchTerm}
                  placeholder={"Job Title, Keywords or Company Name..."}
                  handleSubmit={() => {}}
                />
              </div>
            )}

            <section class="utf_manage_jobs_area">
              {loading ? (
                <Spinner />
              ) : Object.keys(filterFields).length || searchTerm ? (
                filteredJobs.length ? (
                  <>
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
                          {filteredJobs?.map((e) => {
                            return (
                              <Row
                                data={{ id: e.id, job: e }}
                                type={"EMPLOYER_JOBS"}
                                deleteJob={() => {
                                  HandleDelete(e.id);
                                }}
                              />
                            );
                          })}
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="zeroResultContainer">
                    <h3>No Jobs Found</h3>
                  </div>
                )
              ) : jobs?.length ? (
                <>
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
                              type={"EMPLOYER_JOBS"}
                              deleteJob={() => {
                                HandleDelete(e.id);
                              }}
                            />
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className="zeroResultContainer">
                  <h3>No Jobs Found</h3>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostedJob;
