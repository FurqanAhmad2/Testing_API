import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import { PaystackButton } from 'react-paystack';
import { PaystackConsumer } from 'react-paystack';
import PaystackPop from "@paystack/inline-js";
import Footer from "../components/layout/footer/footer";

// import paystackKey from './ConfigurePaystack'; // Make sure to adjust the path as needed


const plansCandidate = () => {
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

  const paywithpaystack = (amount,id) => {

    const email = profile?.email;
    const paystack = new PaystackPop()
    console.log(PayStackkey)

    paystack.newTransaction({
      key: PayStackkey,
      amount: amount,
      email: "furqana405@gmail.com",

      onSuccess(transaction) {
        let message = `Payment Complete! Refrence ${transaction.reference} Please Wait for a few moments here don't Refresh or Redirect to anyother Page`
        alert(message)

        setTimeout(() => {
          verifyTransaction(transaction.reference,id);
        }, 10000);


      },
      onCancel() {
        alert("You have Cancel Transaction")
      }

    })
  }


  const  verifyTransaction= async (reference,id)=> {
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

      let StatusPayment=""
      if(data.data.status=="success"){
        StatusPayment="SUCCESS"
      }else{
        StatusPayment="FAILURE"

      }

      
      // Call the function with the necessary arguments
      const res = postSubscription(token,id, data.data.reference, data.data.receipt_number,StatusPayment,toast, navigate);
      console.log('Billing response:', res);
      toast.success("Payment submitted successfully.");
      navigate("/kyc-verification");

      // Handle the parsed data here (e.g., update component state)
    } catch (error) {
      console.error(error);
      // Handle error here (e.g., display an error message)
    }
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
      
      else{
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

      
      console.log(amount," to be paid")
      paywithpaystack(amount,id);



      // postSubscription({ subscription: id }, token, toast, navigate);
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

                {/* {HandleClick(2)} */}
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
                {/* {HandleClick(3)} */}
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

                {/* {HandleClick(5)} */}
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
                <button className="priceBtn" onClick={() => { }}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>

   
      </div>
      <Footer/>
    </>
  );
};

export default plansCandidate;