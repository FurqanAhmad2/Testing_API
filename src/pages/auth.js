import {
  faGoogle,
  faLinkedin,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  employeeLogin,
  employeeRegister,
  employerLogin,
  employerRegister,
  googleLogin,
  googleRegister,
  linkedinLogin,
  linkedinRegister1,
  linkedinRegister2,
} from "../apicalls";
import { AuthContext } from "../context/AuthContext";
import CountryStateCity from "../countries+states+cities.json";
import { auth, provider, microsoftProvider } from "../firebase";
import { signInWithPopup, OAuthProvider } from "firebase/auth";
import Heading1 from "../components/common/Heading1/heading1";
import ActionButton from "../components/common/ActionButton/actionButton";
import { useLinkedIn } from "react-linkedin-login-oauth2";

const CandidateRegisterInitial = {
  first_name: "",
  last_name: "",
  email: "",
  user_type: "EMPLOYEE",
  gender: "",
  enthnicity: "",
  country: "",
  state: "",
  city: "",
  password: "",
  password2: "",
  admin: "",
  role:""
};

const CandidateSigninInitial = { username: "", password: "" };

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
  admin: "",
  role: "",
};

const EmployerSigninInitial = { username: "", password: "" };

const Auth = ({ type }) => {
  const { dispatch, isFetching } = useContext(AuthContext);
  const navigate = useNavigate();
  const { linkedInLogin } = useLinkedIn({
    clientId: "777secj8f6fp6n",
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (code) => {
      setLinkedinTokenId(code);
    },
    onError: (error) => {
      toast("Something Went Wrong");
    },
    scope: "r_emailaddress,r_liteprofile",
  });

  const [userType, setUserType] = useState(1);
  const [googleTokenId, setGoogleTokenId] = useState(null);
  const [linkedinTokenId, setLinkedinTokenId] = useState(null);
  const [microsoftTokenId, setMicrosoftTokenId] = useState(null);
  const [linkedinData, setLinkedinData] = useState(null);
  const [candidateRegisterFields, setCandidateRegisterFields] = useState(
    CandidateRegisterInitial
  );
  const [candidateSigninFields, setCandidateSigninFields] = useState(
    CandidateSigninInitial
  );
  const [employerRegisterFields, setEmployerRegisterFields] = useState(
    EmployerRegisterInitial
  );
  const [employerSigninFields, setEmployerSigninFields] = useState(
    EmployerSigninInitial
  );
  const [countryIndex, setCountryIndex] = useState(null);
  const [stateIndex, setStateIndex] = useState(null);

  useEffect(() => {
    const func = async () => {
      if (linkedinTokenId && type === "Register") {
        const res = await linkedinRegister1(
          {
            redirect_url: `${window.location.origin}/linkedin`,
            token: linkedinTokenId,
          },
          toast
        );
        setLinkedinTokenId(null);
        setLinkedinData(res ? res : null);
        if (res) {
          toast("Please fill the details");
          setCandidateRegisterFields({
            ...candidateRegisterFields,
            first_name: res?.data?.localizedFirstName,
            last_name: res?.data?.localizedLastName,
          });
        }
      }
      if (linkedinTokenId && type === "Signin") {
        const res = await linkedinLogin(
          {
            redirect_url: `${window.location.origin}/linkedin`,
            token: linkedinTokenId,
          },
          dispatch,
          toast,
          navigate
        );
      }
    };

    func();
  }, [linkedinTokenId]);

  useEffect(() => {
    setGoogleTokenId(null);
    setLinkedinData(null);
    setMicrosoftTokenId(null);
    setCountryIndex(null);
    setStateIndex(null);
    setCandidateRegisterFields({ ...CandidateRegisterInitial });
    setCandidateSigninFields({ ...CandidateSigninInitial });
    setEmployerRegisterFields({ ...EmployerRegisterInitial });
    setEmployerSigninFields({ ...EmployerSigninInitial });
  }, [type, userType]);

  useEffect(() => {
    setUserType(1);
  }, [type]);

  useEffect(() => {
    if (countryIndex) {
      setEmployerRegisterFields({
        ...employerRegisterFields,
        state: "",
        city: "",
      });
      setCandidateRegisterFields({
        ...candidateRegisterFields,
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
    setCandidateRegisterFields({
      ...candidateRegisterFields,
      city: "",
    });
  }, [stateIndex]);

  useEffect(() => {
    if (employerRegisterFields.employer_type === "I")
      setEmployerRegisterFields({ ...employerRegisterFields, agency_name: "" });
  }, [employerRegisterFields.employer_type]);

  const HandleSubmit = async () => {
    if (googleTokenId) {
      HandleGoogleRegister();
      return;
    }

    if (linkedinData) {
      HandleLinkedInRegister();
      return;
    }
    if (microsoftTokenId) {
      HandleMicrosoftRegister();
      return;
    }

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (type === "Register" && userType === 1) {
      if (
        candidateRegisterFields.password2 !== candidateRegisterFields.password
      ) {
        toast("Passwords do not match");
        return;
      }
      if (
        !/\d/.test(candidateRegisterFields.password) ||
        candidateRegisterFields.password.length < 8 ||
        !specialChars.test(candidateRegisterFields.password)
      ) {
        toast(
          "Password should be 8 character long and have atleast 1 number and 1 special character"
        );
        return;
      }
      const res = await employeeRegister(
        candidateRegisterFields,
        dispatch,
        toast,
        navigate
      );
    } else if (type === "Register" && userType === 2) {
      if (
        employerRegisterFields.password2 !== employerRegisterFields.password
      ) {
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
      const res = await employerRegister(
        employerRegisterFields,
        dispatch,
        toast,
        navigate
      );
    } else if (type === "Signin" && userType === 1) {
      const res = await employeeLogin(
        candidateSigninFields,
        dispatch,
        toast,
        navigate
      );
    } else {
      const res = await employerLogin(
        employerSigninFields,
        dispatch,
        toast,
        navigate
      );
    }
  };

  const HandleLinkedInRegister = async () => {
    console.log("register");
    const res = await linkedinRegister2(
      { ...candidateRegisterFields, linkedin_id: linkedinData?.data?.id },
      dispatch,
      toast,
      navigate
    );
  };

  const HandleGoogleRegister = async () => {
    const res = await googleRegister(
      candidateRegisterFields,
      googleTokenId,
      dispatch,
      toast,
      navigate
    );
  };

  const HandleMicrosoftRegister = async () => {
    const res = await googleRegister(
      candidateRegisterFields,
      microsoftTokenId,
      dispatch,
      toast,
      navigate
    );
  };

  return (
    <div className="authContainer">
      <div className="authContent">
        <div className="authMainContent">
          <div className="ptag1">
            <Heading1
              text={type === "Signin" ? `Sign in as.` : `Register as.`}
            />
          </div>

          <div>
            <div className="typeContent">
              <ActionButton
                text="Candidate"
                handleClick={() => {
                  setUserType(1);
                }}
                type={userType === 1 ? "filled" : "outline"}
              />
              <ActionButton
                text="Employer"
                handleClick={() => {
                  setUserType(2);
                }}
                type={userType === 2 ? "filled" : "outline"}
              />
            </div>
          </div>

          <form
            className="loginBox"
            onSubmit={(e) => {
              e.preventDefault();
              HandleSubmit();
            }}
          >
            {type === "Register" && userType === 1 ? (
              <div className="inputFieldContainer">
                <div>
                  <h4>First Name</h4>
                  <input
                    placeholder="John"
                    type="text"
                    required
                    className="loginInput"
                    value={candidateRegisterFields.first_name}
                    onChange={(e) => {
                      setCandidateRegisterFields({
                        ...candidateRegisterFields,
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
                    value={candidateRegisterFields.last_name}
                    onChange={(e) => {
                      setCandidateRegisterFields({
                        ...candidateRegisterFields,
                        last_name: e.target.value,
                      });
                    }}
                  />
                </div>

                {!googleTokenId && !microsoftTokenId && (
                  <>
                    <div>
                      <h4>Email</h4>
                      <input
                        placeholder="email@abc.com"
                        type="email"
                        required
                        className="loginInput"
                        value={candidateRegisterFields.email}
                        onChange={(e) => {
                          setCandidateRegisterFields({
                            ...candidateRegisterFields,
                            email: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </>
                )}

                {!googleTokenId && !linkedinData && !microsoftTokenId && (
                  <>
                    <div>
                      <h4>Password</h4>
                      <input
                        placeholder="******"
                        type="password"
                        required
                        className="loginInput"
                        value={candidateRegisterFields.password}
                        onChange={(e) => {
                          setCandidateRegisterFields({
                            ...candidateRegisterFields,
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
                        value={candidateRegisterFields.password2}
                        onChange={(e) => {
                          setCandidateRegisterFields({
                            ...candidateRegisterFields,
                            password2: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </>
                )}

                <div>
                  <h4>Gender</h4>
                  <select
                    className="loginInput"
                    required
                    value={candidateRegisterFields.gender}
                    onChange={(e) => {
                      setCandidateRegisterFields({
                        ...candidateRegisterFields,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <option disabled selected value="">
                      -- select a gender --
                    </option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Non-binary/non-conforming">
                      Non-binary/non-conforming
                    </option>
                    <option value="Prefer not to respond">
                      Prefer not to respond
                    </option>
                  </select>
                </div>

                <div>
                  <h4>Enthnicity </h4>
                  <select
                    className="loginInput"
                    required
                    value={candidateRegisterFields.enthnicity}
                    onChange={(e) => {
                      setCandidateRegisterFields({
                        ...candidateRegisterFields,
                        enthnicity: e.target.value,
                      });
                    }}
                  >
                    <option disabled selected value="">
                      -- select an enthnicity --
                    </option>
                    <option value="Asian ">Asian</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Mixed ethnic groups">
                      Mixed ethnic groups
                    </option>
                  </select>
                </div>

                <div>
                  <h4>Country</h4>
                  <select
                    className="loginInput"
                    required
                    onChange={(e) => {
                      setCandidateRegisterFields({
                        ...candidateRegisterFields,
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
                        <option value={`${e.name}+${index}`}>{e.name}</option>
                      );
                    })}
                  </select>

                  {countryIndex ? (
                    <select
                      className="loginInput"
                      value={
                        candidateRegisterFields.state
                          ? `${candidateRegisterFields.state}+${stateIndex}`
                          : ""
                      }
                      onChange={(e) => {
                        setCandidateRegisterFields({
                          ...candidateRegisterFields,
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
                  ) : null}

                  {stateIndex ? (
                    <select
                      className="loginInput"
                      value={candidateRegisterFields.city}
                      onChange={(e) => {
                        setCandidateRegisterFields({
                          ...candidateRegisterFields,
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
            ) : type === "Register" && userType === 2 ? (
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

                {!googleTokenId ? (
                  <>
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
                  </>
                ) : null}

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
                  <h4>Type</h4>
                  <select
                    className="loginInput"
                    required
                    value={employerRegisterFields.employer_type}
                    onChange={(e) => {
                      setEmployerRegisterFields({
                        ...employerRegisterFields,
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
                    value={employerRegisterFields.agency_name}
                    onChange={(e) => {
                      setEmployerRegisterFields({
                        ...employerRegisterFields,
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
                    onChange={(e) => {
                      setEmployerRegisterFields({
                        ...employerRegisterFields,
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
            ) : type === "Signin" && userType === 1 ? (
              <div className="inputFieldContainer">
                <div>
                  <h4>User Name</h4>
                  <input
                    placeholder="email@abc.com"
                    type="email"
                    required
                    className="loginInput"
                    value={candidateSigninFields.username}
                    onChange={(e) => {
                      setCandidateSigninFields({
                        ...candidateSigninFields,
                        username: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <h4>Password</h4>
                  <input
                    placeholder="******"
                    type="password"
                    required
                    className="loginInput"
                    value={candidateSigninFields.password}
                    onChange={(e) => {
                      setCandidateSigninFields({
                        ...candidateSigninFields,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="inputFieldContainer">
                <div>
                  <h4>User Name</h4>
                  <input
                    placeholder="email@abc.com"
                    type="email"
                    required
                    className="loginInput"
                    value={employerSigninFields.username}
                    onChange={(e) => {
                      setEmployerSigninFields({
                        ...employerSigninFields,
                        username: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <h4>Password</h4>
                  <input
                    placeholder="******"
                    type="password"
                    required
                    className="loginInput"
                    value={employerSigninFields.password}
                    onChange={(e) => {
                      setEmployerSigninFields({
                        ...employerSigninFields,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            )}

            {type === "Signin" && (
              <button
                type="button"
                onClick={() => {
                  navigate("/resetpassword");
                }}
              >
                <p style={{ color: "#000000CC", fontSize: 14 }}>
                  Forget Password?
                </p>
              </button>
            )}

            <div className="submitBtnContainer">
              <button type="submit">
                <ActionButton
                  text={isFetching ? "Loading..." : "Continue"}
                  handleClick={() => {}}
                />
              </button>
            </div>
            {/* <button className="loginButton" type="submit">
                {isFetching ? "Loading..." : "Continue"}
              </button> */}
          </form>

          <div>
            {userType === 1 ? (
              <>
                {googleTokenId || linkedinData || microsoftTokenId ? (
                  <>
                    <div className="seperator">
                      <h5>Fill the details</h5>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="seperator">
                      <div className="seperatorLine"></div>
                      <p>or</p>
                      <div className="seperatorLine"></div>
                    </div>
                  </>
                )}

                <div className="authBtnsContainer">
                  <button
                    className="authBtns"
                    onClick={() => {
                      setGoogleTokenId(null);
                      setLinkedinData(null);
                      setMicrosoftTokenId(null);
                      signInWithPopup(auth, provider)
                        .then(async (result) => {
                          const user = result.user;
                          const token = await user.getIdToken();

                          if (type === "Register") {
                            setGoogleTokenId(token);
                            setCandidateRegisterFields({
                              ...candidateRegisterFields,
                              email: user.email,
                            });

                            toast("Please fill the details");
                          } else
                            await googleLogin(token, dispatch, toast, navigate);
                        })
                        .catch((error) => {
                          toast("Something Went Wrong");
                        });
                    }}
                  >
                    <div className="iconContainer">
                      <FontAwesomeIcon icon={faGoogle} />
                    </div>
                    <h4>
                      {googleTokenId
                        ? "Google Authenticated"
                        : type === "Signin"
                        ? "SignIn With Google"
                        : "Register With Google"}
                    </h4>
                  </button>

                  <button
                    className="authBtns"
                    onClick={() => {
                      setGoogleTokenId(null);
                      setLinkedinData(null);
                      setMicrosoftTokenId(null);
                      signInWithPopup(auth, microsoftProvider)
                        .then(async (result) => {
                          // const credential =
                          //   OAuthProvider.credentialFromResult(result);
                          // const accessToken = credential.accessToken;
                          // const token = credential.idToken;
                          const user = result.user;
                          const token = await user.getIdToken();
                          if (type === "Register") {
                            setMicrosoftTokenId(token);
                            setCandidateRegisterFields({
                              ...candidateRegisterFields,
                              email: user.email,
                            });

                            toast("Please fill the details");
                          } else
                            await googleLogin(token, dispatch, toast, navigate);

                          console.log(await user.getIdToken());
                        })
                        .catch((error) => {
                          toast("Something Went Wrong");
                        });
                    }}
                  >
                    <div className="iconContainer">
                      <FontAwesomeIcon icon={faMicrosoft} />
                    </div>
                    <h4>
                      {type === "Signin"
                        ? "SignIn With Microsoft"
                        : "Register With Microsoft"}
                    </h4>
                  </button>

                  <button
                    className="authBtns"
                    onClick={() => {
                      setGoogleTokenId(null);
                      setLinkedinData(null);
                      setMicrosoftTokenId(null);
                      linkedInLogin();
                    }}
                  >
                    <div className="iconContainer">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </div>
                    <h4>
                      {linkedinData
                        ? "LinkedIn Authenticated"
                        : type === "Signin"
                        ? "SignIn With LinkedIn"
                        : "Register With LinkedIn"}
                    </h4>
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
