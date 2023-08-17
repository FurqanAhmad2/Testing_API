import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs/breadcrumbs";
import { getSubscriptions, postSubscription } from "../apicalls";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Plans = () => {
  const navigate = useNavigate();
  const { token, subscriptionDetails } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);

  const {
    isError: subscriptionError,
    isLoading: subscriptionLoading,
    data: subscription,
  } = useQuery({
    queryKey: [`Plans`],
    queryFn: getSubscriptions,
  });

  const HandleClick = (id) => {
    if (!token) {
      toast("Please Sign In");
      navigate("/signin");
    }
    if (id === subscriptionDetails?.data?.subcription?.id) {
      toast("You are on this plan currently");
      navigate("/profile/currentplan");
    } else {
      postSubscription({ subscription: id }, token, toast, navigate);
    }
  };

  return (
    <>
      <div className="banner">
        <div className="bannerContent">
          <h1>Plans</h1>
        </div>
      </div>

      <div className="plansPageContainer">
        <div className="plansPageContent">
          <Breadcrumbs text="Plans" />
          <div className="toggleContainer">
            <p>Billed Monthly</p>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <FontAwesomeIcon icon={toggle ? faToggleOn : faToggleOff} />
            </button>
            <p>Billed Yearly</p>
          </div>

          <div class="pricingContainer ">
            <div className="pricingCard card1 shadow">
              <div className="header">
                <p className="priceTitle">Free Trial</p>
                <p className="priceSubheader">For Individuals</p>
              </div>

              <div className="priceRowContainer">
                <div className="priceLine">
                  <p className="price">{`$${toggle ? 0 : 0}`}</p>
                  <p className="priceDetails">/per user per month</p>
                </div>

                <div className="pointsContainer">
                  <div className="points">
                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Up to 10 Jobs</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Up to 100 Candidates</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Up to 10 Hiring Managers</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="priceBtnContainer">
                <button
                  className="priceBtn"
                  onClick={() => {
                    HandleClick(2);
                  }}
                >
                  Select
                </button>
              </div>
            </div>

            <div className="pricingCard card2 shadow">
              <div className="header">
                <p className="priceTitle">Basic</p>
                <p className="priceSubheader">For Small Teams</p>
              </div>

              <div className="priceRowContainer">
                <div className="priceLine">
                  <p className="price">{`$${toggle ? 14 : 15}`}</p>
                  <p className="priceDetails">/per user per month</p>
                </div>

                <div className="pointsContainer">
                  <div className="points">
                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Up to 20 Jobs</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Up to 5,000 Candidates</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Up to 100 Hiring Managers</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="priceBtnContainer">
                <button
                  className="priceBtn"
                  onClick={() => {
                    HandleClick(3);
                  }}
                >
                  Select
                </button>
              </div>
            </div>

            <div className="pricingCard card3 shadow">
              <div className="header">
                <p className="priceTitle">Professional</p>
                <p className="priceSubheader">For Organizations</p>
              </div>

              <div className="priceRowContainer">
                <div className="priceLine">
                  <p className="price">{`$${toggle ? 22 : 25}`}</p>
                  <p className="priceDetails">/per user per month</p>
                </div>

                <div className="pointsContainer">
                  <div className="points">
                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Up to 100 Jobs</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Up to 10,000 Candidates</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Up to 1,000 Hiring Managers</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="priceBtnContainer">
                <button
                  className="priceBtn"
                  onClick={() => {
                    HandleClick(4);
                  }}
                >
                  Select
                </button>
              </div>
            </div>

            <div className="pricingCard card1 shadow">
              <div className="header">
                <p className="priceTitle">Enterprise</p>
                <p className="priceSubheader">For Industry Leaders</p>
              </div>

              <div className="priceRowContainer">
                <div className="priceLine">
                  <p className="price">{`$${toggle ? 30 : 35}`}</p>
                  <p className="priceDetails">/per user per month</p>
                </div>

                <div className="pointsContainer">
                  <div className="points">
                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Unlimited Jobs</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Unlimited Candidates</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Unlimited Hiring Managers</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="priceBtnContainer">
                <button
                  className="priceBtn"
                  onClick={() => {
                    HandleClick(5);
                  }}
                >
                  Select
                </button>
              </div>
            </div>

            <div className="pricingCard card2 shadow">
              <div className="header">
                <p className="priceTitle">Custom Plan</p>
                <p className="priceSubheader">For Custom Integration</p>
              </div>

              <div className="priceRowContainer">
                <div className="priceLine">
                  <p className="price">On Demand</p>
                </div>

                <div className="pointsContainer">
                  <div className="points">
                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Everything in Enterprise Plan</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Custom Features</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Custom Integrations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="priceBtnContainer">
                <button className="priceBtn" onClick={() => {}}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plans;
