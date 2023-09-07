import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";
import { getSubscriptions, postSubscription, getEmployeeProfile } from "../apicalls";
import PaystackPop from "@paystack/inline-js";
import { useQuery } from "@tanstack/react-query";
import Countdown from 'react-countdown';
import { toast } from 'react-toastify';
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';
import Footer from "../components/layout/footer/footer";



const CandidateProdecure = () => {


  const navigate = useNavigate();
  const [showCountdown, setShowCountdown] = useState(false);
  const { token, subscriptionDetails } = useContext(AuthContext);

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
      navigate("/kyc-verification-candidate");

      // Handle the parsed data here (e.g., update component state)
    } catch (error) {
      console.error(error);
      // Handle error here (e.g., display an error message)
    }
  }


  const handleCandidatePayment = (id) => {
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
      console.log(profile?.email)
      const amountInKobo = 2500; // $25 in kobo
      const email = profile?.email;
      const metadata = { planId: id };
      const publicKey = process.env.REACT_APP_PAYSTACK_KEY
      console.log(id)

      console.log("----------------------------------")

      let amount = amountInKobo;



      console.log(amount, " to be paid")
      paywithpaystack(amount, id);



      // postSubscription({ subscription: id }, token, toast, navigate);
    }
  };





  return (
    <div>
      <div className="kycBanner">
        <div className="kycBannerContent">
          <h1>Why Verification Matters
          </h1>
        </div>
      </div>
      <div className="kycCenterContainer">

        {showCountdown ? (
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
        ) : (
          <div className="buttonContainer">
            <button
              className="actionBtnContainer actionBtnContainerFilled"
              onClick={handleCandidatePayment}
            >
              Click to Pay
            </button>
          </div>
        )}






      </div>
      <div className="kycDescription">
        <p className="kycParagraph">
          In today's world, where information is readily available, employers are becoming more cautious when hiring new talent. They want to ensure that they are making informed decisions when selecting candidates for their organizations. This is where our Background Check Services come into play. <br />

          The Power of a Verified Profile

          A verified profile carries a distinct mark of credibility, setting you apart from the crowd. It's a symbol of trustworthiness and integrity that employers value. Here's why you should consider getting your profile verified:<br />

          <br />1. Enhanced Credibility: A verified mark beside your profile demonstrates that you are who you claim to be. This significantly boosts your credibility in the eyes of potential employers.

          <br />2. Increased Trust: Employers are more likely to trust candidates with verified profiles, reducing their doubts about your qualifications and background.

          <br />3. Expanded Reach: Verified profiles often receive more attention from employers and are more likely to get shortlisted for interviews. This means you'll have access to a wider range of job opportunities.

          <br />4. Competitive Advantage: In a competitive job market, a verified profile gives you an edge over other candidates who haven't undergone background checks.

          <br />Our Verification Process

          <br />Our thorough verification process ensures the accuracy and authenticity of your profile:

          <br />1. Personal Information Verification: We validate your personal details, such as your name, address, and contact information, to confirm their accuracy.

          <br />2. Education and Qualification Verification: We verify your educational qualifications and certifications to ensure they are genuine.

          <br />3. Employment History Verification: We check your employment history to confirm your work experience, job titles, and responsibilities.

          <br />4. Criminal Background Check: We conduct a comprehensive criminal background check to ensure there are no red flags.

          <br />5. Reference Verification: We contact your provided references to validate your professional reputation.

          <br />6. Identity Verification: We confirm your identity through official documents to prevent impersonation.

        </p>
      </div>


      <Footer />
    </div>
  );
};

export default CandidateProdecure;
