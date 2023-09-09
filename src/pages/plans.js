import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa7,
  faAngleRight,
  faAnglesLeft,
  faCircleCheck,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs/breadcrumbs";
import { getSubscriptions, postSubscription } from "../apicalls";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getEmployeeProfile, signout } from "../apicalls";
import { toast } from "react-toastify";
import Countdown from 'react-countdown';
import { PaystackButton } from 'react-paystack';
import { PaystackConsumer } from 'react-paystack';
import PaystackPop from "@paystack/inline-js";

import Footer from "../components/layout/footer/footer";
import { faAccessibleIcon } from "@fortawesome/free-brands-svg-icons";

// import paystackKey from './ConfigurePaystack'; // Make sure to adjust the path as needed


const Plans = () => {
  const navigate = useNavigate();
  const { token, subscriptionDetails } = useContext(AuthContext);
  const [showCountdown, setShowCountdown] = useState(false);

  const [toggle, setToggle] = useState(false);

  const {
    isError: subscriptionError,
    isLoading: subscriptionLoading,
    data: subscription,
  } = useQuery({
    queryKey: [`Plans`],
    queryFn: getSubscriptions,
  });

  const PayStackkey = process.env.REACT_APP_PAYSTACK_KEY_PUBLIC;
  const PayStackSecret = process.env.REACT_APP_PAYSTACK_KEY_SECRET;

  const {
    isError,
    isLoading: profileLoading,
    data: profile,
  } = useQuery({
    queryKey: ["Profile", token],
    queryFn: getEmployeeProfile,
  });

  const paywithpaystack = (amount, id) => {

    const email = profile?.email;
    const paystack = new PaystackPop()
    console.log(PayStackkey)

    paystack.newTransaction({
      key: PayStackkey,
      amount: amount,
      email: "furqana405@gmail.com",

      onSuccess(transaction) {
        setShowCountdown(true); // Show the countdown
        setTimeout(() => {
          verifyTransaction(transaction.reference, id);
        }, 10000);
      },
      onCancel() {
        alert("You have Cancel Transaction")
      }

    })
  }


  const verifyTransaction = async (reference, id) => {
    const url = `https://api.paystack.co/transaction/verify/${reference}`;
    const headers = {
      // Authorization: `Bearer ${PayStackSecret}`
      Authorization: `Bearer sk_test_64438f62e730e1dca4d92cf02c968a3417ba897c`
    };

    try {
      const response = await fetch(url, { headers });
      const data = await response.json();
      console.log(data.data.receipt_number);
      console.log(data.data.reference);
      console.log(data.data.status);

      let StatusPayment = ""
      if (data.data.status == "success") {
        StatusPayment = "SUCCESS"
      } else {
        StatusPayment = "FAILURE"

      }


      // Call the function with the necessary arguments
      const res = postSubscription(token, id, data.data.reference, data.data.receipt_number, StatusPayment, toast, navigate);
      console.log('Billing response:', res);
      toast.success("Payment submitted successfully.");
      navigate("/profile");

      // Handle the parsed data here (e.g., update component state)
    } catch (error) {
      console.error(error);
      // Handle error here (e.g., display an error message)
    }
  }


  const freeTrial = () => {
    // Call the function with the necessary arguments
    const res = postSubscription(token, 2, -1, -1, "SUCCESS", toast, navigate);
    console.log('Billing response:', res);
    toast.success("Payment submitted successfully.");
    navigate("/profile");
  }



  const HandleClick = (id) => {
    if (!token) {
      toast("Please Sign In");
      navigate("/signin");
    }

    if (id === subscriptionDetails?.data?.subcription?.id) {
      toast("You are on this plan currently");
      console.log("subscriptionDetails")
      console.log(subscriptionDetails)
      console.log("subscriptionDetails")
      navigate("/profile/currentplan");
    }


    else {
      console.log("----------------------------------")
      console.log(id)
      console.log(toggle)
      console.log(profile?.email)
      const amountInKobo = 2500; // $25 in kobo
      const email = profile?.email;
      const metadata = { planId: id };
      const publicKey = process.env.REACT_APP_PAYSTACK_KEY
      console.log(id)

      console.log("----------------------------------")

      let amount = 0;

      if (!toggle) {
        if (id == 2) {
          amount = 0;
        }

        if (id == 3) {

          amount = 1500;
        }

        if (id == 4) {

          amount = 2500;
        }

        if (id == 5) {
          amount = 3500;
        }
      }

      else {
        if (id == 2) {
          amount = 0;
        }

        if (id == 3) {

          amount = 1400;
        }

        if (id == 4) {

          amount = 2200;
        }

        if (id == 5) {
          amount = 3000;
        }

      }


      if (amount > 0) {
        console.log(amount, " to be paid")
        paywithpaystack(amount, id);

      }
      else {
        console.log(amount, " to be paid")

        freeTrial();
      }




      // postSubscription({ subscription: id }, token, toast, navigate);
    }
  };


  const navToTrail = () => {
    navigate("/trial")
  }

  const navToBas = () => {
    navigate("/basic")
  }


  const navToProf = () => {
    navigate("/professional")
  }

  const navToEnterPrise = () => {
    navigate("/enterprise")
  }


  const navToCustom = () => {
    navigate("/custom")
  }




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
                      <p>Post up to 20 jobs</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Basic candidate management and communication features.</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Basic resume parsing</p>
                    </div>

                    <div className="pricingRow" onClick={navToTrail}>
                      <FontAwesomeIcon icon={faAngleRight} className="icon" />
                      <p
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          display: "inline",
                          marginLeft: "4px", // Add margin for spacing
                        }}
                      >
                        Show more
                      </p>
                    </div>




                  </div>
                </div>
              </div>

              {subscriptionDetails?.data?.subcription?.subcription_name === "Free Trial" ? (
                <div className="priceBtnContainer">
                  <button
                    className="priceBtn"

                  >
                    Selected
                  </button>
                  {/* {HandleClick(3)} */}
                </div>
              ) : (
                <div className="priceBtnContainer">
                  <button
                    className="priceBtn"
                    onClick={() => {
                      HandleClick(2);
                    }}
                  >
                    Select
                  </button>
                  {/* {HandleClick(3)} */}
                </div>
              )}

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
                      <p>Up to 300 job postings </p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Integration with popular job boards</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Basic phone and email support</p>
                    </div>

                    <div className="pricingRow" onClick={navToBas}>
                      <FontAwesomeIcon icon={faAngleRight} className="icon" />
                      <p
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          display: "inline",
                          marginLeft: "4px", // Add margin for spacing
                        }}
                      >
                        Show more
                      </p>
                    </div>






                  </div>
                </div>
              </div>

              {subscriptionDetails?.data?.subcription?.subcription_name === "Basic" ? (
                <div className="priceBtnContainer">
                  <button
                    className="priceBtn"

                  >
                    Selected
                  </button>
                  {/* {HandleClick(3)} */}
                </div>
              ) : (
                <div className="priceBtnContainer">
                  <button
                    className="priceBtn"
                    onClick={() => {
                      HandleClick(3);
                    }}
                  >
                    Select
                  </button>
                  {/* {HandleClick(3)} */}
                </div>
              )}

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
                      <p>Up to 1000 job postings</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Automated interview scheduling</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Collaboration tools for teams.</p>
                    </div>

                    <div className="pricingRow" onClick={navToProf}>
                      <FontAwesomeIcon icon={faAngleRight} className="icon" />
                      <p
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          display: "inline",
                          marginLeft: "4px", // Add margin for spacing
                        }}
                      >
                        Show more
                      </p>
                    </div>


                  </div>
                </div>
              </div>

              {subscriptionDetails?.data?.subcription?.subcription_name === "Professional" ? (
                <div className="priceBtnContainer">
                  <button
                    className="priceBtn"

                  >
                    Selected
                  </button>
                  {/* {HandleClick(3)} */}
                </div>
              ) : (
                <div className="priceBtnContainer">
                  <button
                    className="priceBtn"
                    onClick={() => {
                      HandleClick(4);
                    }}
                  >
                    Select
                  </button>
                  {/* {HandleClick(3)} */}
                </div>
              )}

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
                      <p>Up to 3000 job postings</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Compliance and security features</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Integration with third-party assessment tools</p>
                    </div>

                    <div className="pricingRow" onClick={navToEnterPrise}>
                      <FontAwesomeIcon icon={faAngleRight} className="icon" />
                      <p
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          display: "inline",
                          marginLeft: "4px", // Add margin for spacing
                        }}
                      >
                        Show more
                      </p>
                    </div>


                  </div>
                </div>
              </div>

              {subscriptionDetails?.data?.subcription?.subcription_name === "Enterprise" ? (
                <div className="priceBtnContainer">
                  <button
                    className="priceBtn"

                  >
                    Selected
                  </button>
                  {/* {HandleClick(3)} */}
                </div>
              ) : (
                <div className="priceBtnContainer">
                  <button
                    className="priceBtn"
                    onClick={() => {
                      HandleClick(5);
                    }}
                  >
                    Select
                  </button>
                  {/* {HandleClick(3)} */}
                </div>
              )}

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
                      <p>Fully tailored features based on specific organizational needs</p>
                    </div>

                    <div className="pricingRow">
                      <FontAwesomeIcon icon={faCircleCheck} className="icon" />
                      <p>Advanced data privacy and compliance features</p>
                    </div>

                  

                    <div className="pricingRow" onClick={navToCustom}>
                      <FontAwesomeIcon icon={faAngleRight} className="icon" />
                      <p
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          display: "inline",
                          marginLeft: "4px", // Add margin for spacing
                        }}
                      >
                        Show more
                      </p>
                    </div>


                  </div>
                </div>
              </div>

              <div className="priceBtnContainer">
                <button className="priceBtn" onClick={() => { }}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {showCountdown && (
            <div className="countdown-overlay" style={showCountdown ? { display: 'block' } : { display: 'none' }}>
              <div className="countdown-container">
                <Countdown
                  date={Date.now() + 10000} // 10 seconds
                  onComplete={() => {
                    setShowCountdown(false); // Hide the countdown when it completes
                    navigate("/profile");
                  }}
                  renderer={({ hours, minutes, seconds }) => (
                    <div>
                      <p>We are Verifying your Payment! Redirecting in:</p>
                      <p>{`${minutes}:${seconds}`}</p>
                    </div>
                  )}
                />
              </div>
            </div>
          )}

        </div>


      </div>
      <Footer />
    </>
  );
};

export default Plans;