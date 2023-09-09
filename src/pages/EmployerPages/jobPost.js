import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  getCategories,
  getCompanies,
  getJobPosts,
  getTimezones,
  postJob,
} from "../../apicalls";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import Spinner from "../../components/common/spinner";
import { AuthContext } from "../../context/AuthContext";
import CountryStateCity from "../../countries+states+cities.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import Breadcrumbs from "../../components/common/Breadcrumbs/breadcrumbs";
import ScreenPermissionError from "../../components/common/ScreenPermissionError/screenPermissionError";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";
import ScreenError from "../../components/common/ScreenError/screenError";

const InitialFields = {
  title: "",
  description: "",
  company: "",
  category: "",
  vacancy: "",
  expiry_date: "",
  salary_min: "",
  salary_max: "",
  country: "",
  state: "",
  city: "",
  pin: "",
  is_remote: "",
  timezone: "",
  job_type: "",
  term: "",
};

const JobPost = () => {
  const { token, subscriptionDetails } = useContext(AuthContext);
  console.log(subscriptionDetails);
  const navigate = useNavigate();
  const [jobFields, setJobFields] = useState(InitialFields);
  const [loading, setLoading] = useState(false);

  const [countryIndex, setCountryIndex] = useState(null);
  const [stateIndex, setStateIndex] = useState(null);

  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");

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

  const {
    isError: timezonesError,
    isLoading: timezonesLoading,
    data: timezones,
  } = useQuery({
    queryKey: [`Timezones`, token],
    queryFn: getTimezones,
  });

  const {
    isError: jobsError,
    isLoading: jobsLoading,
    data: jobs,
    refetch,
  } = useQuery({
    queryKey: [`AllJobsPosted`, token],
    queryFn: getJobPosts,
  });

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { ...jobFields, skills: options.join(",") };

    try{
      const res = await postJob(token, data, toast, setLoading, navigate);
    }catch(e){
        toast("Maximum number of Jobs reached. Please Upgrade Plan.");
    }
    } 

  useEffect(() => {
    if (countryIndex) {
      setJobFields({ ...jobFields, state: "", city: "" });
      setStateIndex(null);
    }
  }, [countryIndex]);

  useEffect(() => {
    setJobFields({ ...jobFields, city: "" });
  }, [stateIndex]);

  useEffect(() => {
    if (jobFields.job_type !== "Contract")
      setJobFields({ ...jobFields, term: "" });
  }, [jobFields.job_type]);

  if (categoriesLoading || companyLoading || timezonesLoading || jobsLoading)
    return <ScreenLoading />;
  if (categoriesError || companyError || timezonesError || jobsError)
    return <ScreenError />;

  if (subscriptionDetails?.permissionIdList?.includes(5)) {
    return (
      <div>
        <div className="banner">
          <div className="bannerContent">
            <h1>Post Job</h1>
            <div className="imgContainer">
              {/* <img src={AboutUsBanner} /> */}
            </div>
          </div>
        </div>

        <div className="employerPageContainer">
          <Breadcrumbs text="Post Job" />
          <section class="create-job">
            <form
              class="c-form"
              onSubmit={(e) => {
                HandleSubmit(e);
              }}
            >
              <div class="box">
                <div class="box-header">
                  <h4>General Information</h4>
                </div>
                <div class="box-body">
                  <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <label>Job Title</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Name..."
                        required
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
                            title: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div class="col-md-6 col-sm-6 col-xs-12">
                      <label>Vacancy</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Vacancy..."
                        required
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
                            vacancy: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div class="col-xs-12 m-clear">
                      <label>Description</label>
                      <textarea
                        type="text"
                        class="form-control"
                        placeholder="Write description here..."
                        style={{ minHeight: 150 }}
                        required
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
                            description: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                      <label>Organizations</label>
                      <select
                        class="form-control"
                        required
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
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

                    <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                      <label>Category</label>
                      <select
                        class="form-control"
                        required
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
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

                    <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                      <label>Timezone</label>
                      <select
                        class="form-control"
                        required
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
                            timezone: e.target.value,
                          });
                        }}
                      >
                        <option disabled selected value="">
                          -- select a category --
                        </option>
                        {timezones?.map((e) => {
                          return <option value={e}>{e}</option>;
                        })}
                      </select>
                    </div>

                    <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                      <label>Country</label>
                      <select
                        className="form-control"
                        required
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
                            country: e.target.value.substring(
                              0,
                              e.target.value.indexOf("+")
                            ),
                          });
                          setCountryIndex(
                            e.target.value.substring(
                              e.target.value.indexOf("+") + 1
                            )
                          );
                        }}
                      >
                        <option disabled selected value="">
                          -- select a country --
                        </option>
                        {CountryStateCity?.map((e, index) => {
                          return (
                            <option value={`${e.name}+${index}`}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {countryIndex ? (
                      <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                        <label>State</label>
                        <select
                          className="form-control"
                          value={
                            jobFields.state
                              ? `${jobFields.state}+${stateIndex}`
                              : ""
                          }
                          onChange={(e) => {
                            setJobFields({
                              ...jobFields,
                              state: e.target.value.substring(
                                0,
                                e.target.value.indexOf("+")
                              ),
                            });

                            setStateIndex(
                              e.target.value.substring(
                                e.target.value.indexOf("+") + 1
                              )
                            );
                          }}
                        >
                          <option disabled selected value="">
                            -- select a state --
                          </option>
                          {CountryStateCity[countryIndex]?.states?.map(
                            (e, index) => {
                              return (
                                <option value={`${e.name}+${index}`}>
                                  {e.name}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </div>
                    ) : null}

                    {stateIndex ? (
                      <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                        <label>City</label>
                        <select
                          className="form-control"
                          value={jobFields.city}
                          onChange={(e) => {
                            setJobFields({
                              ...jobFields,
                              city: e.target.value,
                            });
                          }}
                        >
                          <option disabled selected value="">
                            -- select a city --
                          </option>
                          {CountryStateCity[countryIndex]?.states[
                            stateIndex
                          ]?.cities?.map((e) => {
                            return <option value={e.name}>{e.name}</option>;
                          })}
                        </select>
                      </div>
                    ) : null}

                    <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                      <label>Zipcode</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="100011"
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
                            pin: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                      <label>Salary Starting</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="100011"
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
                            salary_min: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                      <label>Salary Ending</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="100011"
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
                            salary_max: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                      <label>Expiry Date</label>
                      <input
                        type="date"
                        class="form-control"
                        placeholder="100011"
                        min={format(new Date(), "Y-MM-dd")}
                        required
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
                            expiry_date: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                      <label>Is Remote?</label>
                      <select
                        class="form-control"
                        required
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
                            is_remote: e.target.value,
                          });
                        }}
                      >
                        <option disabled selected value="">
                          -- select remote or not --
                        </option>
                        <option value="N">No</option>
                        <option value="Y">Yes</option>
                      </select>
                    </div>

                    <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                      <label>Job Type</label>
                      <select
                        class="form-control"
                        required
                        onChange={(e) => {
                          setJobFields({
                            ...jobFields,
                            job_type: e.target.value,
                          });
                        }}
                      >
                        <option disabled selected value="">
                          -- select job type--
                        </option>
                        <option value="Part Time">Part Time</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Trainee">Trainee</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>

                    {jobFields.job_type === "Contract" ? (
                      <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                        <label>Term</label>
                        <select
                          class="form-control"
                          required
                          onChange={(e) => {
                            setJobFields({
                              ...jobFields,
                              term: e.target.value,
                            });
                          }}
                        >
                          <option disabled selected value="">
                            -- select type --
                          </option>
                          <option value="1 month">1 month</option>
                          <option value="3 months">3 months</option>
                          <option value="6 months">6 months</option>
                          <option value="1 year">1 year</option>
                        </select>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div class="box">
                <div class="box-header">
                  <h4>Required Skills</h4>
                </div>

                <div class="box-body">
                  <div class="row">
                    <div class="col-md-12 col-sm-6 col-xs-12">
                      <label>Add Skills</label>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 20,
                        }}
                      >
                        <input
                          type="text"
                          style={{ margin: 0 }}
                          class="form-control"
                          placeholder="Java, Python..."
                          value={optionInput}
                          onChange={(e) => {
                            setOptionInput(e.target.value);
                          }}
                        />

                        <button
                          className="button"
                          style={{ marginLeft: 10, maxWidth: 80 }}
                          type="button"
                          onClick={() => {
                            setOptions([...options, optionInput]);
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {options.map((e, index) => {
                      return (
                        <li
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: 5,
                          }}
                        >
                          <h4 style={{ fontSize: 18 }}>{e}</h4>
                          <button
                            className="deleteBtn"
                            type="button"
                            onClick={() => {
                              let arr = [...options];
                              arr.splice(index, 1);
                              setOptions([...arr]);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </li>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div class="text-center">
                <button type="submit" class="btn btn-m theme-btn full-width">
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </section>{" "}
        </div>
      </div>
    );
  } else return <ScreenPermissionError />;
};

export default JobPost;
