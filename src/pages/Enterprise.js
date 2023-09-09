import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/common/ActionButton/actionButton";




const Enterprise = () => {

  const navigate = useNavigate();



  return (
    <div>


      <div className="kycBanner">
        <div className="kycBannerContent">
          <h1>Enterprise

          For Industry Leaders</h1>
        </div>
      </div>
      <div className="kycDescription">
        <p className="kycParagraph">
        In the Enterprise Account, we provide you with the following advanced features:

          
          <li>Up to 3,000 job postings</li>
          <li>Advanced features for large-scale recruitment</li>
          <li>Enhanced AI-driven candidate assessment and screening</li>
          <li>Integration with third-party assessment tools</li>
          <li>Advanced analytics and data visualization</li>
          <li>Compliance and security features</li>
          <li>API access for integration with other systems</li>
          <li>Dedicated account manager and 24/7 support</li>

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

export default Enterprise;
