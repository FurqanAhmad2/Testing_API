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
          <h1>Why Verification Matters
      </h1>
        </div>
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
      <div className="kycDescription">
        <p className="kycParagraph">
        In today's world, where information is readily available, employers are becoming more cautious when hiring new talent. They want to ensure that they are making informed decisions when selecting candidates for their organizations. This is where our Background Check Services come into play. <br/>

The Power of a Verified Profile

A verified profile carries a distinct mark of credibility, setting you apart from the crowd. It's a symbol of trustworthiness and integrity that employers value. Here's why you should consider getting your profile verified:<br/>

<br/>1. Enhanced Credibility: A verified mark beside your profile demonstrates that you are who you claim to be. This significantly boosts your credibility in the eyes of potential employers.

<br/>2. Increased Trust: Employers are more likely to trust candidates with verified profiles, reducing their doubts about your qualifications and background.

<br/>3. Expanded Reach: Verified profiles often receive more attention from employers and are more likely to get shortlisted for interviews. This means you'll have access to a wider range of job opportunities.

<br/>4. Competitive Advantage: In a competitive job market, a verified profile gives you an edge over other candidates who haven't undergone background checks.

<br/>Our Verification Process

<br/>Our thorough verification process ensures the accuracy and authenticity of your profile:

<br/>1. Personal Information Verification: We validate your personal details, such as your name, address, and contact information, to confirm their accuracy.

<br/>2. Education and Qualification Verification: We verify your educational qualifications and certifications to ensure they are genuine.

<br/>3. Employment History Verification: We check your employment history to confirm your work experience, job titles, and responsibilities.

<br/>4. Criminal Background Check: We conduct a comprehensive criminal background check to ensure there are no red flags.

<br/>5. Reference Verification: We contact your provided references to validate your professional reputation.

<br/>6. Identity Verification: We confirm your identity through official documents to prevent impersonation.

        </p>
      </div>

     

    </div>
  );
};

export default CandidateProdecure;
