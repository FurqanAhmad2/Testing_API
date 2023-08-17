import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCompany, getCompanies, getJobPosts } from "../../apicalls";
import ActionButton from "../../components/common/ActionButton/actionButton";
import Heading1 from "../../components/common/Heading1/heading1";
import Row from "../../components/common/Row/row";
import Searchbar from "../../components/common/Searchbar/searchbar";
import Spinner from "../../components/common/spinner";
import { AuthContext } from "../../context/AuthContext";
import ScreenError from "../../components/common/ScreenError/screenError";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";

const EmployerCompany = () => {
  const { token, profile } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    isError,
    isLoading,
    data: companies,
    refetch,
  } = useQuery({
    queryKey: [`AllCompanies`, token],
    queryFn: getCompanies,
  });

  useEffect(() => {
    if (searchTerm === "") {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setResult(
        companies.filter(
          (company) =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ===
            true
        )
      );

      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const HandleDelete = async (id) => {
    const res = await deleteCompany(token, id, toast);
    refetch();
  };

  if (isLoading) return <ScreenLoading />;
  if (isError) return <ScreenError />;

  return (
    <>
      <div className="dashboardHeader">
        <Heading1 text={"Entities"} />
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
          <div>
            <Link to="/createcompany">
              <ActionButton
                text="Create Entity"
                type={"outline"}
                handleClick={() => {}}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="tableContainer paddingHorizontal paddingTop">
        <section class="utf_manage_jobs_area">
          {!companies?.length ? (
            <div className="zeroResultContainer">
              <h3>No Companies created</h3>
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

                    {result?.map((e) => {
                      return (
                        <Row
                          data={e}
                          type={"COMPANY"}
                          deleteCompany={() => {
                            HandleDelete(e.id);
                          }}
                        />
                      );
                    })}
                  </table>
                </div>
              </div>
            ) : (
              <div className="zeroResultContainer">
                <h3>No Companies Found</h3>
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

                  {companies?.map((e) => {
                    return (
                      <Row
                        data={e}
                        type={"COMPANY"}
                        deleteCompany={() => {
                          HandleDelete(e.id);
                        }}
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
};

export default EmployerCompany;
