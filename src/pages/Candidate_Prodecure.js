import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';



const CandidateProdecure = () => {
 

  const navigate = useNavigate();
  
  const { token, subscriptionDetails } = useContext(AuthContext);

  const handleCandidatePayment =()=>{
      navigate("/Candidate-Plan")
  }


 


  return (
    <div>
      <div className="kycBanner">
        <div className="kycBannerContent">
          <h1>What is Verfication and Why Do You Need It?</h1>
        </div>
      </div>
      <div className="kycDescription">
        <p className="kycParagraph">
          KYC (Know Your Customer) is a process used by businesses to verify
          the identity of their customers. It involves collecting and verifying
          certain personal information to ensure that the customer is who they
          claim to be. KYC helps businesses establish trust, prevent fraud, and
          comply with legal and regulatory requirements.
        </p>
      </div>

      <div className="kycCenterContainer">

      <div className="buttonContainer">
          <button
            className="actionBtnContainer actionBtnContainerFilled"
            onClick={handleCandidatePayment}
          >
            Go to Payment Page
          </button>
        </div>
      </div>

    </div>
  );
};

export default CandidateProdecure;
