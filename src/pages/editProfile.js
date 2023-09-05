import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { editEmployeeProfile, getEmployeeProfile, editEmployerProfile} from "../apicalls";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CountryStateCity from "../countries+states+cities.json";
import { toast } from "react-toastify";
import SubHeading1 from "../components/common/SubHeading1/subHeading1";

const EditProfile = () => {
  let navigate = useNavigate();
  const { dispatch, token, type } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [employeeProfile, setEmployeeProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    user_type: type,
    gender: "",
    country: "",
    state: "",
    city: "",
  });
  const [employerProfile, setEmployerProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    user_type: type,
    gender: "",
    country: "",
    state: "",
    city: "",
    employer_type: "",
    agency_name: "",
  });
  const [countryIndex, setCountryIndex] = useState(null);
  const [stateIndex, setStateIndex] = useState(null);

  const { isLoading: profileLoading, data: profile } = useQuery({
    queryKey: ["Profile", token],
    queryFn: getEmployeeProfile,
  });

  useEffect(() => {

    console.log(type)
    if (profile && type === "EMPLOYEE") {
      let temp = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        user_type: type,
        gender: profile.gender,
        contact_number: profile.contact_number,
        country: profile.country,
        state: profile.state,
        city: profile.city,
      };

      setEmployeeProfile({ ...temp });
      for (let i = 0; i < CountryStateCity.length; i++) {
        if (CountryStateCity[i].name === profile.country) {
          setCountryIndex(i);
          for (let j = 0; j < CountryStateCity[i].states.length; j++) {
            if (CountryStateCity[i].states[j].name === profile.state) {
              setStateIndex(j);
              for (
                let k = 0;
                k < CountryStateCity[i].states[j].cities.length;
                k++
              ) {
                if (CountryStateCity[i].states[j].cities[k] === profile.city) {
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
      setProfileFetched(true);
    }
    if (profile && type === "EMPLOYER") {
      let temp = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        user_type: "EMPLOYER",
        gender: profile.gender,
        employer_type: profile.employer_type,
        agency_name: profile.agency_name,
        country: profile.country,
        state: profile.state,
        city: profile.city,
      };

      setEmployerProfile({ ...temp });
      for (let i = 0; i < CountryStateCity.length; i++) {
        if (CountryStateCity[i].name === profile.country) {
          setCountryIndex(i);
          for (let j = 0; j < CountryStateCity[i].states.length; j++) {
            if (CountryStateCity[i].states[j].name === profile.state) {
              setStateIndex(j);
              for (
                let k = 0;
                k < CountryStateCity[i].states[j].cities.length;
                k++
              ) {
                if (CountryStateCity[i].states[j].cities[k] === profile.city) {
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
      setProfileFetched(true);
    }
  }, [profile]);

  // console.log(employerProfile);

  const HandleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (type === "EMPLOYEE") {
      // Submit employeeProfile data
      editEmployeeProfile(
        token,
        employeeProfile,
        setLoading,
        dispatch,
        toast,
        navigate
      );
    } else if (type === "EMPLOYER") {
      // Submit employerProfile data
      editEmployeeProfile(
        token,
        employerProfile, // Use employerProfile instead of employeeProfile
        setLoading,
        dispatch,
        toast,
        navigate
      );
    }
  };
  

  if (profileLoading) return <h1>Loading...</h1>;

  return (
    <div className="editProfileContainer">
      <div className="editProfileContent">
        <div className="editProfileHeader">
          <button
            className="backBtn"
            onClick={() => {
              navigate(-1);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <SubHeading1 text={"Edit Profile"} />
        </div>

        <form
          className="editProfileFields"
          onSubmit={(e) => {
            HandleSubmit(e);
          }}
        >
          {type === "EMPLOYEE" ? (
            <>
              <div>
                <h4>First Name</h4>
                <input
                  placeholder="John"
                  type="text"
                  required
                  className="loginInput"
                  value={employeeProfile.first_name}
                  onChange={(e) => {
                    setEmployeeProfile({
                      ...employeeProfile,
                      first_name: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <h4>Last Name</h4>
                <input
                  placeholder="Doe"
                  type="text"
                  required
                  className="loginInput"
                  value={employeeProfile.last_name}
                  onChange={(e) => {
                    setEmployeeProfile({
                      ...employeeProfile,
                      last_name: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <h4>Email</h4>
                <input
                  placeholder="abc@gmail.com"
                  type="email"
                  required
                  className="loginInput"
                  value={employeeProfile.email}
                  onChange={(e) => {
                    setEmployeeProfile({
                      ...employeeProfile,
                      email: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <h4>Contact Number</h4>
                <input
                  placeholder="9876543210"
                  type="number"
                  required
                  className="loginInput"
                  value={employeeProfile.contact_number}
                  onChange={(e) => {
                    setEmployeeProfile({
                      ...employeeProfile,
                      contact_number: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <h4>Gender</h4>
                <select
                  className="loginInput"
                  required
                  value={employeeProfile.gender}
                  onChange={(e) => {
                    setEmployeeProfile({
                      ...employeeProfile,
                      gender: e.target.value,
                    });
                  }}
                >
                  <option disabled selected value="">
                    -- select a gender --
                  </option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <h4>Country</h4>
                <select
                  className="loginInput"
                  required
                  value={
                    countryIndex
                      ? `${employeeProfile.country}+${countryIndex}`
                      : ""
                  }
                  onChange={(e) => {
                    setEmployeeProfile({
                      ...employeeProfile,
                      country: e.target.value.substring(
                        0,
                        e.target.value.indexOf("+")
                      ),
                      state: "",
                      city: "",
                    });
                    setCountryIndex(
                      e.target.value.substring(e.target.value.indexOf("+") + 1)
                    );
                    setStateIndex(null);
                  }}
                >
                  <option disabled selected value="">
                    -- select a country --
                  </option>
                  {CountryStateCity.map((e, index) => {
                    return (
                      <option value={`${e.name}+${index}`}>{e.name}</option>
                    );
                  })}
                </select>

                {countryIndex ? (
                  <select
                    className="loginInput"
                    value={
                      employeeProfile.state
                        ? `${employeeProfile.state}+${stateIndex}`
                        : ""
                    }
                    onChange={(e) => {
                      setEmployeeProfile({
                        ...employeeProfile,
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
                    {CountryStateCity[countryIndex]?.states?.map((e, index) => {
                      return (
                        <option value={`${e.name}+${index}`}>{e.name}</option>
                      );
                    })}
                  </select>
                ) : null}

                {stateIndex ? (
                  <select
                    className="loginInput"
                    value={employeeProfile.city}
                    onChange={(e) => {
                      setEmployeeProfile({
                        ...employeeProfile,
                        city: e.target.value,
                      });
                    }}
                  >
                    <option disabled selected value="">
                      -- select a city --
                    </option>
                    {CountryStateCity[countryIndex]?.states[
                      stateIndex
                    ]?.cities.map((e) => {
                      return <option value={e.name}>{e.name}</option>;
                    })}
                  </select>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <div>
                <h4>First Name</h4>
                <input
                  placeholder="John"
                  type="text"
                  required
                  className="loginInput"
                  value={employerProfile.first_name}
                  onChange={(e) => {
                    setEmployerProfile({
                      ...employerProfile,
                      first_name: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <h4>Last Name</h4>
                <input
                  placeholder="Doe"
                  type="text"
                  required
                  className="loginInput"
                  value={employerProfile.last_name}
                  onChange={(e) => {
                    setEmployerProfile({
                      ...employerProfile,
                      last_name: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <h4>Email</h4>
                <input
                  placeholder="abc@gmail.com"
                  type="email"
                  required
                  className="loginInput"
                  value={employerProfile.email}
                  onChange={(e) => {
                    setEmployerProfile({
                      ...employerProfile,
                      email: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <h4>Gender</h4>
                <select
                  className="loginInput"
                  required
                  value={employerProfile.gender}
                  onChange={(e) => {
                    setEmployerProfile({
                      ...employerProfile,
                      gender: e.target.value,
                    });
                  }}
                >
                  <option disabled selected value="">
                    -- select a gender --
                  </option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <h4>Type</h4>
                <select
                  className="loginInput"
                  required
                  value={employerProfile.employer_type}
                  onChange={(e) => {
                    setEmployerProfile({
                      ...employerProfile,
                      employer_type: e.target.value,
                    });
                  }}
                >
                  <option disabled selected value="">
                    -- select type --
                  </option>
                  <option value="A">Agency</option>
                  <option value="I">Individual</option>
                </select>
              </div>

              <div>
                <h4>Company Name</h4>
                <input
                  placeholder="company name"
                  type="text"
                  required
                  className="loginInput"
                  value={employerProfile.agency_name}
                  onChange={(e) => {
                    setEmployerProfile({
                      ...employerProfile,
                      agency_name: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <h4>Country</h4>
                <select
                  className="loginInput"
                  required
                  value={
                    countryIndex
                      ? `${employerProfile.country}+${countryIndex}`
                      : ""
                  }
                  onChange={(e) => {
                    setEmployerProfile({
                      ...employerProfile,
                      country: e.target.value.substring(
                        0,
                        e.target.value.indexOf("+")
                      ),
                      state: "",
                      city: "",
                    });
                    setCountryIndex(
                      e.target.value.substring(e.target.value.indexOf("+") + 1)
                    );
                    setStateIndex(null);
                  }}
                >
                  <option disabled selected value="">
                    -- select a country --
                  </option>
                  {CountryStateCity.map((e, index) => {
                    return (
                      <option value={`${e.name}+${index}`}>{e.name}</option>
                    );
                  })}
                </select>

                {countryIndex ? (
                  <select
                    className="loginInput"
                    value={
                      employerProfile.state
                        ? `${employerProfile.state}+${stateIndex}`
                        : ""
                    }
                    onChange={(e) => {
                      setEmployerProfile({
                        ...employerProfile,
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
                    {CountryStateCity[countryIndex]?.states?.map((e, index) => {
                      return (
                        <option value={`${e.name}+${index}`}>{e.name}</option>
                      );
                    })}
                  </select>
                ) : null}

                {stateIndex ? (
                  <select
                    className="loginInput"
                    value={employerProfile.city}
                    onChange={(e) => {
                      setEmployerProfile({
                        ...employerProfile,
                        city: e.target.value,
                      });
                    }}
                  >
                    <option disabled selected value="">
                      -- select a city --
                    </option>
                    {CountryStateCity[countryIndex]?.states[
                      stateIndex
                    ]?.cities.map((e) => {
                      return <option value={e.name}>{e.name}</option>;
                    })}
                  </select>
                ) : null}
              </div>
            </>
          )}

          <button className="mx-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none" 
          style={{height: '170%'}}
          type="submit" >
            {loading ? "Loading..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
