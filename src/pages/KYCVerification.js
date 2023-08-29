import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

import {
  submitKYCData
} from "../../src/apicalls";


const KYCVerification = () => {
  const acceptedIDs = [
    "Select Document Type",
    "International passport",
    "Driver's License",
    "Ghana National Identification Card",
    "Ghana Voters ID",
    "Ghana National Health Identification Card",
    "Ghana Tax Identification Number",
    "Others...",
  ];

  const navigate = useNavigate();
  const [selectedID, setSelectedID] = useState("");
  const [otherDocument, setOtherDocument] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { token, subscriptionDetails } = useContext(AuthContext);

  const handleIDSelection = (e) => {
    const { value } = e.target;
    setSelectedID(value);
    if (value !== "Others...") {
      setOtherDocument("");
    }
  };

  const handleOtherDocument = (e) => {
    const { value } = e.target;
    setOtherDocument(value);
  };

  const handleDocumentNumber = (e) => {
    const { value } = e.target;
    setDocumentNumber(value.replace(/\D/, ""));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.error('Your file should not exceed 20MB. Please choose a smaller file.');
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
        toast.success(`File "${file.name}" has been uploaded.`);
      }
    }
  };

  const handleSubmit = async () => {
    // Validate form fields
    if (selectedID === "") {
      toast.error("Please select an ID type.");
      return;
    }

    if (selectedID === "Others..." && otherDocument === "") {
      toast.error("Please enter the document name.");
      return;
    }

    if (documentNumber === "") {
      toast.error("Please enter the document number.");
      return;
    }

    if (!selectedFile) {
      toast.error("Please upload a file.");
      return;
    }

    // Submit the form data
    try {
      const formData = new FormData();
      formData.append("kycNumber", documentNumber);
      formData.append("file", selectedFile);

      if (selectedID === "Others...") {
        formData.append("kycType", otherDocument);
      } else {
        formData.append("kycType", selectedID);
      }

      // Call the function with the necessary arguments
      const res = submitKYCData(token, documentNumber, selectedFile, selectedID, otherDocument);


      toast.success("KYC data submitted successfully.");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while submitting KYC data.");
    }
  };


  return (
    <div>
      <div className="kycBanner">
        <div className="kycBannerContent">
          <h1>What is KYC and Why Do You Need It?</h1>
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


        <div className="file-kyc">
          <label htmlFor="Label" className="label_01" >
            ID type:
          </label>
          <select
            id=""
            className="Kyc_sel_input"
            value={selectedID}
            onChange={handleIDSelection}
          >
            {acceptedIDs.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>



        {selectedID === "Others..." && (
          <div className="">
            <label htmlFor="">
              Document Name:
            </label>
            <input
              type="text"
              id="otherDocument"
            className="Kyc_sel_input"
      
              value={otherDocument}
              onChange={handleOtherDocument}
              placeholder="Enter document name"
            />
          </div>
        )}
        <div className="file-kyc mt-4 ">
          <label htmlFor="" className="lab-kyc-doc">
            Document Number:
          </label>
          <input
            type="text"
            id="documentNumber"
            className="inputDoc"

            value={documentNumber}
            onChange={handleDocumentNumber}
            placeholder="Enter document number"
          />
          <div className="uploadContainer">
            <label htmlFor="fileInput" className="customButton customButtonFilled">
              <FontAwesomeIcon icon={faCloudDownloadAlt} className="icon" />
            </label>
            <input
              type="file"
              id="fileInput"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="buttonContainer">
          <button
            className="actionBtnContainer actionBtnContainerFilled"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

    </div>
  );
};

export default KYCVerification;
