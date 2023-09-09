import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/common/ActionButton/actionButton";




const Custom = () => {

  const navigate = useNavigate();



  return (
    <div>


      <div className="kycBanner">
        <div className="kycBannerContent">
          <h1>Custom Plans

          For Custom Integration</h1>
        </div>
      </div>
      <div className="kycDescription">
        <p className="kycParagraph">
        Our Custom Plan offers fully tailored features based on your specific organizational needs, including:

          
          <li>White-labeling and branding options</li>
          <li>Customized integrations with proprietary systems</li>
          <li>Advanced reporting with custom metrics</li>
          <li>Multi-region and multi-language support</li>
          <li>Advanced data privacy and compliance features</li>
          <li>On-site training and implementation support</li>
          <li>Continuous feature updates and customization</li>
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

export default Custom;
