import { compose } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCompanyById, patchCompany, postCompany } from "../../apicalls";
import Breadcrumbs from "../../components/common/Breadcrumbs/breadcrumbs";
import { AuthContext } from "../../context/AuthContext";
import CountryStateCity from "../../countries+states+cities.json";
import { useQuery } from "@tanstack/react-query";
import { ca } from "date-fns/locale";

const InitialFields = {
  name: "",
  description: "",
  reg_no: "",
  country: "",
  state: "",
  city: "",
  pin: "",
};
const CreateCompany = () => {
  const { token, subscriptionDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { companyId } = useParams();

  const [companyFields, setCompanyFields] = useState(InitialFields);
  const [loading, setLoading] = useState(false);
  const [countryIndex, setCountryIndex] = useState(null);
  const [stateIndex, setStateIndex] = useState(null);

  const {
    isLoading: companyLoading,
    isError: companyError,
    data: company,
  } = useQuery({
    queryKey: [`Company${companyId}`, token, companyId],
    queryFn: getCompanyById,
    enabled: !!companyId,
  });

  useEffect(() => {
    const func = async () => {
      const temp = {
        name: company.name,
        description: company.description,
        reg_no: company.reg_no,
        pin: company.pin,
        country: company.country,
        state: company.state,
        city: company.city,
      };
      setCompanyFields({
        ...temp,
      });
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
    };
    if (company && companyId) func();
  }, [company, companyId]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Here")
    if (companyId) {
      const res = await patchCompany(
        token,
        companyFields,
        companyId,
        toast,
        setLoading,
        navigate
      );
    } else {
      try{
        const res = await postCompany(
          token,
          companyFields,
          toast,
          setLoading,
          navigate
        );
      }catch(e){
        toast("Maximum number of Company reached. Please upgrade plan.");
      }
    }
  };

  return (
    <div>
      <div className="banner">
        <div className="bannerContent">
          <h1>
            {location.pathname.includes("editcompany")
              ? "Edit Entity"
              : "Create Entity"}
          </h1>
          <div className="imgContainer">
            {/* <img src={AboutUsBanner} /> */}
          </div>
        </div>
      </div>

      <div className="employerPageContainer">
        <Breadcrumbs
          text={
            location.pathname.includes("editcompany")
              ? "Edit Entity"
              : "Create Entity"
          }
        />
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
                  <div class="col-md-6 col-sm-6 col-xs-12 m-clear">
                    <label>Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Name..."
                      value={companyFields.name}
                      onChange={(e) => {
                        setCompanyFields({
                          ...companyFields,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div class="col-md-6 col-sm-6 col-xs-12 m-clear">
                    <label>Registration Number</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="12345678"
                      value={companyFields.reg_no}
                      onChange={(e) => {
                        setCompanyFields({
                          ...companyFields,
                          reg_no: e.target.value,
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
                      value={companyFields.description}
                      onChange={(e) => {
                        setCompanyFields({
                          ...companyFields,
                          description: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div class="col-md-4 col-sm-6 col-xs-12 m-clear">
                    <label>Country</label>
                    <select
                      className="form-control"
                      required
                      value={
                        countryIndex
                          ? `${companyFields.country}+${countryIndex}`
                          : ""
                      }
                      onChange={(e) => {
                        setCompanyFields({
                          ...companyFields,
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
                        required
                        value={
                          companyFields.state
                            ? `${companyFields.state}+${stateIndex}`
                            : ""
                        }
                        onChange={(e) => {
                          setCompanyFields({
                            ...companyFields,
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
                        required
                        value={companyFields.city}
                        onChange={(e) => {
                          setCompanyFields({
                            ...companyFields,
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

                  <div class="col-md-6 col-sm-6 col-xs-12 m-clear">
                    <label>Zipcode</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="100011"
                      value={companyFields.pin}
                      onChange={(e) => {
                        setCompanyFields({
                          ...companyFields,
                          pin: e.target.value,
                        });
                      }}
                    />
                  </div>
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

export default CreateCompany;
