import { compose } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import ScreenError from "../../components/common/ScreenError/screenError";
import { setSubscriptionDetails } from "../../apicalls";
import ScreenMessage from "../../components/common/ScreenMessage/screenMessage";
import ScreenPermissionError from "../../components/common/CurrentPlanError/screenPermissionError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCheck,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";

const CurrentPlan = () => {
  const { subscriptionDetails, dispatch, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSubscriptionDetails(token, dispatch);
    console.log(subscriptionDetails);
  }, []);

  if (!subscriptionDetails) {
    return (
      <>
        <ScreenPermissionError />
      </>
    );
  }
  

  return (
    <>
      <div className="profileBanner">
        <div className="bannerContent">
          <h1>Current Plan</h1>
        </div>
      </div>

      <div className="profileMainContainer shadow">
        <div className="currentPlanContainer">
          <div className="heroboxContainer">
            <div className="herobox planBox">
              <p>Plan Type</p>
              <h1>
                {subscriptionDetails?.data?.subcription?.subcription_name}
              </h1>
            </div>
            <div className="herobox">
              <p>Validity</p>
              <h2>
                {`${format(
                  new Date(subscriptionDetails?.data?.subcription?.created_at),
                  "do MMM, yyyy"
                )} - ${format(
                  new Date(subscriptionDetails?.data?.subcription?.expire_at),
                  "do MMM, yyyy"
                )}`}
              </h2>
            </div>
          </div>

          <div className="permissionTableContainer">
            <p>Features Offered</p>

            <div className="rowContainer">
              {subscriptionDetails?.permissions?.map((e) => {
                return (
                  <div className="card">
                    <div className="icon">
                      <div className="iconContent">
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                    </div>

                    <div>
                      <p className="header">{e?.permission?.permission_name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentPlan;
