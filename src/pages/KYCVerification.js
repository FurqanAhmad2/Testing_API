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

      <div className="flex flex-col items-center justify-center" style={{ marginTop: "1rem" }}>


        <div className="w-full max-w-md p-4">

          <div style={{marginBottom :'6%'}}>
          <div className="mb-4">
            <label htmlFor="Label" className="block text-gray-700">
              ID type:
            </label>
            <select
              id=""
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
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
            <div className="mb-4">
              <label htmlFor="otherDocument" className="block text-gray-700">
                Document Name:
              </label>
              <input
                type="text"
                id="otherDocument"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                value={otherDocument}
                onChange={handleOtherDocument}
                placeholder="Enter document name"
              />
            </div>
          )}
          </div>

          <div className="mb-4"
          style={{marginBottom :'6%'}}>
            <label htmlFor="documentNumber" className="block text-gray-700">
              Document Number:
            </label>
            <input
              type="text"
              id="documentNumber"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
              value={documentNumber}
              onChange={handleDocumentNumber}
              placeholder="Enter document number"
            />
          </div>

          <div className="mb-4"
          style={{marginBottom :'6%'}}>
            <div className="flex items-center">
              <label htmlFor="fileInput" className="block text-gray-700 mr-2">
                Upload Document:
              </label>
              <label htmlFor="fileInput" className="customButton customButtonFilled">
                <FontAwesomeIcon icon={faCloudDownloadAlt} className="icon" />
              </label>
              <input
                type="file"
                id="fileInput"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="mb-4"
          style={{marginBottom :'6%'}}>
            <button
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              style={{
                width: '100%', // Set the desired width
                height: '35px', // Set the desired height
                fontSize: '16px',
                backgroundColor: '#004aad',
              }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>




    </div>
  );
};

export default KYCVerification;
