import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/common/ActionButton/actionButton";




const Professional = () => {

  const navigate = useNavigate();



  return (
    <div>


      <div className="kycBanner">
        <div className="kycBannerContent">
          <h1>Professional Accounts

            For Organizations</h1>
        </div>
      </div>
      <div className="kycDescription">
        <p className="kycParagraph">
          In the Professional Account we proivde you with following functionalities

          
          <li>Up to 1,000 job postings</li>
          <li>Advanced candidate search and filtering options</li>
          <li>Automated interview scheduling</li>
          <li>AI-powered candidate matching and scoring</li>
          <li>Collaboration tools for teams</li>
          <li>Customizable workflows and pipelines</li>
          <li>API access for integration with other systems</li>
          <li>Integration with HRIS (Human Resources Information System) software</li>
          <li>Enhanced customer support with priority SLA</li>
        </p>


       
      </div>

      <div style={{ marginTop: 20 ,display: 'flex', justifyContent: 'center'}}>
          <ActionButton
            text="View Plans"
            handleClick={() => {
              navigate("/plans");
            }}
          />
        </div>






    </div>
  );
};

export default Professional;
