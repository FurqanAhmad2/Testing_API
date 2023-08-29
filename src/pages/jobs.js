import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import {
  getCategories,
  getJobList,
  getJobListSearch,
  getJobsByFilter,
} from "../apicalls";
import {
  faAngleDown,
  faMinus,
  faPlus,
  faSquareCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../components/common/spinner";
import { useQuery } from "@tanstack/react-query";
import JobCard2 from "../components/common/JobCard2/jobCard2";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import Searchbar from "../components/common/Searchbar/searchbar";
import SubHeading1 from "../components/common/SubHeading1/subHeading1";
import Country from "../countriesList.json";
import Modal from "../components/common/Modal/modal";
import useWindow from "../hooks/useWindow";
import ActionButton from "../components/common/ActionButton/actionButton";
import ScreenLoading from "../components/common/ScreenLoading/screenLoading";
import ScreenError from "../components/common/ScreenError/screenError";

const InitialFilter = [
  {
    name: "Salary",
    objName: "salary",
    options: [
      { name: "10000 - 20000", value: "10000 - 20000" },
      { name: "20000 - 30000", value: "20000 - 30000" },
      { name: "30000 - 40000", value: "30000 - 40000" },
      { name: "40000 - 50000", value: "40000 - 50000" },
    ],
  },
  {
    name: "Category",
    objName: "category",
    options: [],
  },
  {
    name: "Country",
    objName: "country",
    options: [{ name: "International", value: "exclude" }, ...Country],
  },
];

const Jobs = () => {
  const { width } = useWindow();
  const [searchParams, setSearchParams] = useSearchParams();
  let country = searchParams.get("country");
  let category = searchParams.get("category");
  let salary_min = searchParams.get("salary_min");
  let salary_max = searchParams.get("salary_max");
  let search = searchParams.get("search");

  const [filters, setFilters] = useState(InitialFilter);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(search || "");

  const [isExpand, setIsExpand] = useState({ category: false, salary: false });
  const [filterFields, setFilterFields] = useState({});
  const [mobileSelectedFilter, setMobileSelectedFilter] = useState(null);
  const [filterModal, setFilterModal] = useState(false);

  const { isError, isLoading, data } = useQuery({
    queryKey: [`AllJobs`],
    queryFn: getJobList,
  });

  const {
    isError: categoriesError,
    isLoading: categoriesLoading,
    data: allCategories,
  } = useQuery({
    queryKey: [`AllCategories`],
    queryFn: getCategories,
  });

  useEffect(() => {
    setSearchParams(() => {
      return [
        country ? ["country", country] : null,
        category ? ["category", category] : null,

        salary_min ? ["salary_min", salary_min] : null,
        salary_max ? ["salary_max", salary_max] : null,

        searchTerm ? ["search", searchTerm] : null,
      ].filter((e) => e);
    });
  }, [searchTerm]);

  useEffect(() => {
    if (allCategories?.length) {
      let arr = [];
      for (let i = 0; i < allCategories.length; i++) {
        arr.push({ name: allCategories[i].name, value: allCategories[i].id });
      }

      let temp = [...filters];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].objName === "category") {
          temp[i].options = [...arr];
        }
      }
      setFilters([...temp]);
    }
  }, [allCategories]);

  useEffect(() => {
    const func = async () => {
      setFilteredJobs([]);
      let str = "";

      if (country === "exclude")
        str =
          str +
          `exclude=${JSON.parse(localStorage.getItem("User_ATS_Country"))}&`;
      else if (country) str = str + `country=${country}&`;
      if (salary_min) str = str + `salary_min=${salary_min}&`;
      if (salary_max) str = str + `salary_max=${salary_max}&`;
      if (category) str = str + `category=${category}&`;
      if (search) str = str + `search=${search}&`;
      str = str.substring(0, str.length - 1);

      if (str) {
        setLoading(true);
        setError(false);
        const res = await getJobsByFilter(str, setLoading, setError);
        setFilteredJobs(res);
      }
    };
    const triggerCall = setTimeout(() => {
      if (country || category || salary_min || salary_max || search) func();
    }, 500);
    return () => clearTimeout(triggerCall);
  }, [country, category, salary_min, salary_max, search]);

  if (isLoading) return <ScreenLoading />;
  if (isError) return <ScreenError />;

  return (
    <>
      <div className="allJobsContainer">
        {width < 700 && (
          <div class="searchcontainer">
            <Searchbar
              searchterm={searchTerm}
              setSearchterm={setSearchTerm}
              placeholder={"Job Title, Keywords or Company Name?..."}
              handleSubmit={() => {}}
            />
          </div>
        )}

        <div class="mainContent">
          <div className="filterContainer">
            {width > 700 ? (
              <>
                {filters.map((filter) => {
                  return (
                    <div class="widget-boxed padd-bot-0 mar-bot-0">
                      <div
                        class="widget-boxed-header"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h4>{filter.name}</h4>

                        {filter.objName !== "country" ? (
                          <button
                            onClick={() => {
                              let obj = { ...isExpand };
                              obj[filter.objName] = !obj[filter.objName];

                              setIsExpand({ ...obj });
                            }}
                            className="expandBtn"
                          >
                            <FontAwesomeIcon
                              icon={isExpand[filter.objName] ? faMinus : faPlus}
                            />
                          </button>
                        ) : null}
                      </div>

                      {filter.objName === "country" ? (
                        <div class="widget-boxed-body">
                          <div class="side-list no-border">
                            <div>
                              <select
                                class="form-control"
                                required
                                value={country || ""}
                                onChange={(e) => {
                                  setSearchParams(() => {
                                    return [
                                      ["country", e?.target?.value],
                                      category ? ["category", category] : null,
                                      salary_min
                                        ? ["salary_min", salary_min]
                                        : null,
                                      salary_max
                                        ? ["salary_max", salary_max]
                                        : null,
                                      search ? ["search", search] : null,
                                    ].filter((e) => e);
                                  });
                                }}
                              >
                                <option disabled selected value="">
                                  -- select a country --
                                </option>
                                {filter?.options?.map((e) => {
                                  return (
                                    <option
                                      style={{ padding: 10 }}
                                      value={e?.value}
                                    >
                                      {e?.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {isExpand[`${filter.objName}`] ? (
                        filter.objName === "salary" ? (
                          <div class="widget-boxed-body">
                            <div class="side-list no-border">
                              <ul>
                                {filter.options.map((e) => {
                                  return (
                                    <li
                                      style={{
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                      onClick={() => {
                                        setSearchParams(() => {
                                          let minSal = e?.value?.substring(
                                            0,
                                            e?.value?.indexOf("-") - 1
                                          );

                                          let maxSal = e?.value?.substring(
                                            e?.value?.indexOf("-") + 2
                                          );
                                          return [
                                            country
                                              ? ["country", country]
                                              : null,
                                            category
                                              ? ["category", category]
                                              : null,

                                            salary_min === minSal &&
                                            salary_max === maxSal
                                              ? null
                                              : ["salary_min", minSal],
                                            salary_min === minSal &&
                                            salary_max === maxSal
                                              ? null
                                              : ["salary_max", maxSal],
                                            ,
                                            ,
                                            search ? ["search", search] : null,
                                          ].filter((e) => e);
                                        });
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={
                                          e?.value?.toString() ===
                                          `${salary_min} - ${salary_max}`.toString()
                                            ? faSquareCheck
                                            : faSquare
                                        }
                                        style={{
                                          fontSize: 16,
                                          marginRight: 8,
                                          color: "#2557a7",
                                        }}
                                      />
                                      <p>{e?.name}</p>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        ) : filter.objName === "category" ? (
                          <div class="widget-boxed-body">
                            <div class="side-list no-border">
                              <ul>
                                {filter.options.map((e) => {
                                  return (
                                    <li
                                      style={{
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                      onClick={() => {
                                        setSearchParams(() => {
                                          return [
                                            country
                                              ? ["country", country]
                                              : null,
                                            category?.toString() ===
                                            e?.value?.toString()
                                              ? null
                                              : ["category", e?.value],
                                            salary_min
                                              ? ["salary_min", salary_min]
                                              : null,
                                            salary_max
                                              ? ["salary_max", salary_max]
                                              : null,
                                            search ? ["search", search] : null,
                                          ].filter((e) => e);
                                        });
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={
                                          e?.value?.toString() ===
                                          category?.toString()
                                            ? faSquareCheck
                                            : faSquare
                                        }
                                        style={{
                                          fontSize: 16,
                                          marginRight: 8,
                                          color: "#2557a7",
                                        }}
                                      />
                                      <p>{e?.name}</p>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        ) : null
                      ) : null}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {filters.map((e) => {
                  return (
                    <button
                      className="filterBtn"
                      onClick={() => {
                        setMobileSelectedFilter(e);
                        setFilterModal(true);
                      }}
                    >
                      {e?.name}
                    </button>
                  );
                })}
              </>
            )}
          </div>

          <div>
            {width > 700 && (
              <Searchbar
                searchterm={searchTerm}
                setSearchterm={setSearchTerm}
                placeholder={"Job Title, Keywords or Company Name?..."}
                handleSubmit={() => {}}
              />
            )}

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <SubHeading1
                text={`${
                  country || category || salary_min || salary_max || search
                    ? filteredJobs.length
                    : data?.length
                } Jobs & Vacancies`}
              />
            </div>

            {loading ? <Spinner /> : null}
            {error ? <h3>Something went wrong</h3> : null}

            {!loading && !error ? (
              country || category || salary_min || salary_max || search ? (
                filteredJobs.length ? (
                  filteredJobs.map((e) => {
                    return <JobCard2 data={e} />;
                  })
                ) : (
                  <div style={{ textAlign: "center", marginTop: 10 }}>
                    <SubHeading1 text="No Jobs Found" />
                  </div>
                )
              ) : (
                data?.map((e) => {
                  return <JobCard2 data={e} />;
                })
              )
            ) : null}
          </div>
        </div>
      </div>

      <Modal modal={filterModal} setModal={setFilterModal}>
        <div className="filterModalContainer">
          <div className="header">
            <SubHeading1 text={mobileSelectedFilter?.name} />
            <button
              onClick={() => {
                setFilterModal(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          {mobileSelectedFilter?.objName === "country" ? (
            <select
              class="form-control"
              required
              value={country || ""}
              onChange={(e) => {
                setSearchParams(() => {
                  return [
                    ["country", e?.target?.value],
                    category ? ["category", category] : null,
                    salary_min ? ["salary_min", salary_min] : null,
                    salary_max ? ["salary_max", salary_max] : null,
                    search ? ["search", search] : null,
                  ].filter((e) => e);
                });
              }}
            >
              <option disabled selected value="">
                -- select a country --
              </option>
              {mobileSelectedFilter?.options?.map((e) => {
                return (
                  <option style={{ padding: 10 }} value={e?.value}>
                    {e?.name}
                  </option>
                );
              })}
            </select>
          ) : (
            mobileSelectedFilter?.options?.map((e) => {
              return (
                <li
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    if (mobileSelectedFilter?.objName === "salary")
                      setSearchParams(() => {
                        let minSal = e?.value?.substring(
                          0,
                          e?.value?.indexOf("-") - 1
                        );

                        let maxSal = e?.value?.substring(
                          e?.value?.indexOf("-") + 2
                        );
                        return [
                          country ? ["country", country] : null,
                          category ? ["category", category] : null,

                          salary_min === minSal && salary_max === maxSal
                            ? null
                            : ["salary_min", minSal],
                          salary_min === minSal && salary_max === maxSal
                            ? null
                            : ["salary_max", maxSal],
                          ,
                          ,
                          search ? ["search", search] : null,
                        ].filter((e) => e);
                      });
                    else
                      setSearchParams(() => {
                        return [
                          country ? ["country", country] : null,
                          category?.toString() === e?.value?.toString()
                            ? null
                            : ["category", e?.value],
                          salary_min ? ["salary_min", salary_min] : null,
                          salary_max ? ["salary_max", salary_max] : null,
                          search ? ["search", search] : null,
                        ].filter((e) => e);
                      });
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      (mobileSelectedFilter?.objName === "salary" &&
                        e?.value?.toString() ===
                          `${salary_min} - ${salary_max}`.toString()) ||
                      (mobileSelectedFilter?.objName === "category" &&
                        e?.value?.toString() === category?.toString())
                        ? faSquareCheck
                        : faSquare
                    }
                    style={{
                      fontSize: 16,
                      marginRight: 8,
                      color: "#2557a7",
                    }}
                  />
                  <p>{e?.name}</p>
                </li>
              );
            })
          )}

          <ActionButton
            text="Close"
            type="outline"
            handleClick={() => {
              setFilterModal(false);
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default Jobs;
