import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/common/ActionButton/actionButton";




const Basic = () => {

  const navigate = useNavigate();



  return (
    <div>


      <div className="kycBanner">
        <div className="kycBannerContent">
          <h1>Basic Account

            For Small Teams</h1>
        </div>
      </div>
      <div className="kycDescription">
        <p className="kycParagraph">
          In the Basic Account we proivde you with following functionalities

          <li>Up to 300 job postings</li>
          <li>Advanced candidate management and communication features</li>
          <li>Enhanced resume parsing with keyword highlighting</li>
          <li>Customizable application forms and questionnaires</li>
          <li>API access for integration with other systems</li>
          <li>Integration with popular job boards</li>
          <li>Advanced reporting and analytics, including source tracking</li>
          <li>Calendar integration</li>
          <li>Basic phone and email support</li>

        </p>


       
      </div>

      <div style={{ marginTop: "2%" ,display: 'flex', justifyContent: 'center'}}>
          <ActionButton
            text="View Plans"
            handleClick={() => {
              navigate("/plans");
            }}
          />
        </div>
        <br/>
        <br/>






    </div>
  );
};

export default Basic;
