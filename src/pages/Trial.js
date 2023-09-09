import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../src/components/common/ActionButton/actionButton";




const Trial = () => {

  const navigate = useNavigate();



  return (
    <div>


      <div className="kycBanner">
        <div className="kycBannerContent">
          <h1>Free Trial

            For Individuals</h1>
        </div>
      </div>
      <div className="kycDescription">
        <p className="kycParagraph">
          In the Free Trial Account we proivde you with following functionalities

          
          <li>Post up to 20 jobs</li>
          <li>Basic candidate management and communication features</li>
          <li>Basic resume parsing</li>
          <li>Standard reporting and analytics</li>
          <li>Email/SMS alerts</li>
          <li>Email customer support</li>

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

export default Trial;
