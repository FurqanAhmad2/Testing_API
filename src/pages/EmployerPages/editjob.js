import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { compose } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getCategories,
  getCompanies,
  getCompanyById,
  getJobById,
  getTimezones,
  patchCompany,
  patchJob,
  postCompany,
} from "../../apicalls";
import Breadcrumbs from "../../components/common/Breadcrumbs/breadcrumbs";
import { AuthContext } from "../../context/AuthContext";
import CountryStateCity from "../../countries+states+cities.json";

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

const EditJob = () => {
  const { token } = useContext(AuthContext);
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [jobFields, setJobFields] = useState(InitialFields);
  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");

  const [countryIndex, setCountryIndex] = useState(null);
  const [stateIndex, setStateIndex] = useState(null);

  const { isError, isLoading, data } = useQuery({
    queryKey: [`JobId${jobId}`, token, jobId],
    queryFn: getJobById,
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

  const {
    isError: timezonesError,
    isLoading: timezonesLoading,
    data: timezones,
  } = useQuery({
    queryKey: [`Timezones`, token],
    queryFn: getTimezones,
  });

  useEffect(() => {
    if (data) {
      const temp = {
        title: data.title,
        description: data.description,
        company: data.company.id,
        category: data.category,
        vacancy: data.vacancy,
        expiry_date: data.expiry_date,
        salary_min: data.salary_min,
        salary_max: data.salary_max,
        pin: data.pin,
        is_remote: data.is_remote,
        timezone: data.timezone,
        job_type: data.job_type,
        term: data.term,
        country: data.country,
        state: data.state,
        city: data.city,
      };

      setOptions(data.skills.split(","));
      setJobFields({ ...temp });

      for (let i = 0; i < CountryStateCity.length; i++) {
        if (CountryStateCity[i].name === temp.country) {
          setCountryIndex(i);
          for (let j = 0; j < CountryStateCity[i].states.length; j++) {
            if (CountryStateCity[i].states[j].name === temp.state) {
              setStateIndex(j);
              for (
                let k = 0;
                k < CountryStateCity[i].states[j].cities.length;
                k++
              ) {
                if (CountryStateCity[i].states[j].cities[k] === temp.city) {
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
    }
  }, [data]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { ...jobFields, skills: options.join(",") };
    const res = await patchJob(token, jobId, data, toast, setLoading, navigate);
  };

  return (
    <div>
      <div className="banner">
        <div className="bannerContent">
          <h1>Edit Job</h1>
          <div className="imgContainer">
            {/* <img src={AboutUsBanner} /> */}
          </div>
        </div>
      </div>

      <div className="employerPageContainer">
        <Breadcrumbs text="Edit Job" />
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
                      value={jobFields.title}
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
                      value={jobFields.vacancy}
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
                      value={jobFields.description}
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
                      value={jobFields.company}
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
                      value={jobFields.category}
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
                      value={jobFields.timezone}
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
                      value={
                        countryIndex
                          ? `${jobFields.country}+${countryIndex}`
                          : ""
                      }
                      onChange={(e) => {
                        setJobFields({
                          ...jobFields,
                          country: e.target.value.substring(
                            0,
                            e.target.value.indexOf("+")
                          ),
                          state: "",
                          city: "",
                        });
                        setCountryIndex(
                          e.target.value.substring(
                            e.target.value.indexOf("+") + 1
                          )
                        );
                        setStateIndex(null);
                      }}
                    >
                      <option disabled selected value="">
                        -- select a country --
                      </option>
                      {CountryStateCity?.map((e, index) => {
                        return (
                          <option value={`${e.name}+${index}`}>{e.name}</option>
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
                            city: "",
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
                      value={jobFields.pin}
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
                      value={jobFields.salary_min}
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
                      value={jobFields.salary_max}
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
                      value={jobFields.expiry_date}
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
                      value={jobFields.is_remote}
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
                      value={jobFields.job_type}
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
                        value={jobFields.term}
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
        </section>
      </div>
    </div>
  );
};

export default EditJob;
