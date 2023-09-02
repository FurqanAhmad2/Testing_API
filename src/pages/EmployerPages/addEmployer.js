import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ActionButton from "../../components/common/ActionButton/actionButton";
import { AuthContext } from "../../context/AuthContext";
import CountryStateCity from "../../countries+states+cities.json";
import { addEmployer, employeeRegister } from "../../apicalls";
import { useNavigate } from "react-router-dom";
import ScreenPermissionError from "../../components/common/ScreenPermissionError/screenPermissionError";

const EmployerRegisterInitial = {
  first_name: "",
  last_name: "",
  email: "",
  user_type: "EMPLOYER",
  gender: "",
  country: "",
  state: "",
  city: "",
  password: "",
  password2: "",
  employer_type: "",
  agency_name: "",
  role: "null",
  admin: "null",
};

const AddEmployer = () => {
  const navigate = useNavigate();
  const { profile, subscriptionDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [employerRegisterFields, setEmployerRegisterFields] = useState(
    EmployerRegisterInitial
  );
  const [countryIndex, setCountryIndex] = useState(null);
  const [stateIndex, setStateIndex] = useState(null);

  useEffect(() => {
    if (countryIndex) {
      setEmployerRegisterFields({
        ...employerRegisterFields,
        state: "",
        city: "",
      });
      setStateIndex(null);
    }
  }, [countryIndex]);

  useEffect(() => {
    setEmployerRegisterFields({
      ...employerRegisterFields,
      city: "",
    });
  }, [stateIndex]);

  const HandleSubmit = async () => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (employerRegisterFields.password2 !== employerRegisterFields.password) {
      toast("Passwords do not match");
      return;
    }
    if (
      !/\d/.test(employerRegisterFields.password) ||
      employerRegisterFields.password.length < 8 ||
      !specialChars.test(employerRegisterFields.password)
    ) {
      toast(
        "Password should be 8 character long and have atleast 1 number and 1 special character"
      );
      return;
    }

    setLoading(true);
    const res = await addEmployer(
      { ...employerRegisterFields, admin: profile.id ,role: employerRegisterFields.role},
      toast,
      setLoading,
      navigate
    );
  };

  if (subscriptionDetails?.permissionIdList?.includes(4))
    return (
      <>
        <div className="profileBanner">
          <div className="bannerContent">
            <h1>Add Member</h1>
          </div>
        </div>

        <div className="profileMainContainer shadow">
          <div className="addEmployerContainer">
            <div className="inputFieldContainer">
              <div>
                <h4>First Name</h4>
                <input
                  placeholder="John"
                  type="text"
                  required
                  className="loginInput"
                  value={employerRegisterFields.first_name}
                  onChange={(e) => {
                    setEmployerRegisterFields({
                      ...employerRegisterFields,
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
                  value={employerRegisterFields.last_name}
                  onChange={(e) => {
                    setEmployerRegisterFields({
                      ...employerRegisterFields,
                      last_name: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <h4>Email</h4>
                <input
                  placeholder="email@abc.com"
                  type="email"
                  required
                  className="loginInput"
                  value={employerRegisterFields.email}
                  onChange={(e) => {
                    setEmployerRegisterFields({
                      ...employerRegisterFields,
                      email: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <h4>Type</h4>
                <select
                  className="loginInput"
                  required
                  value={employerRegisterFields.role}
                  onChange={(e) => {
                    setEmployerRegisterFields({
                      ...employerRegisterFields,
                      role: e.target.value,
                    });
                  }}
                >
                  <option disabled selected value="">
                    -- select a role --
                  </option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>

              <div>
                <h4>Password</h4>
                <input
                  placeholder="******"
                  type="password"
                  required
                  className="loginInput"
                  value={employerRegisterFields.password}
                  onChange={(e) => {
                    setEmployerRegisterFields({
                      ...employerRegisterFields,
                      password: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <h4>Confirm Password</h4>
                <input
                  placeholder="******"
                  type="password"
                  required
                  className="loginInput"
                  value={employerRegisterFields.password2}
                  onChange={(e) => {
                    setEmployerRegisterFields({
                      ...employerRegisterFields,
                      password2: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <h4>Gender</h4>
                <select
                  className="loginInput"
                  required
                  value={employerRegisterFields.gender}
                  onChange={(e) => {
                    setEmployerRegisterFields({
                      ...employerRegisterFields,
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
                  onChange={(e) => {
                    setEmployerRegisterFields({
                      ...employerRegisterFields,
                      country: e.target.value.substring(
                        0,
                        e.target.value.indexOf("+")
                      ),
                    });
                    setCountryIndex(
                      e.target.value.substring(e.target.value.indexOf("+") + 1)
                    );
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

                {countryIndex ? (
                  <select
                    className="loginInput"
                    value={
                      employerRegisterFields.state
                        ? `${employerRegisterFields.state}+${stateIndex}`
                        : ""
                    }
                    onChange={(e) => {
                      setEmployerRegisterFields({
                        ...employerRegisterFields,
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
                    value={employerRegisterFields.city}
                    onChange={(e) => {
                      setEmployerRegisterFields({
                        ...employerRegisterFields,
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
                ) : null}
              </div>
            </div>

            <div className="submitBtnContainer">
              <ActionButton
                text={loading ? "Loading..." : "Submit"}
                handleClick={() => {
                  HandleSubmit();
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  else return <ScreenPermissionError />;
};

export default AddEmployer;
