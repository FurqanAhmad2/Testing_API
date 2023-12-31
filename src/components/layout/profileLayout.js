import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getEmployeeProfile, signout } from "../../apicalls";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  faSignOut,
  faGear,
  faMessage,
  faPhone,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Img from "../../img/company.png";
import Imgv from "../../img/verify.png";

const ProfileLayout = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch, token, type } = useContext(AuthContext);
  const [tabbtn, setTabBtn] = useState(0);

  const {
    isError,
    isLoading: profileLoading,
    data: profile,
  } = useQuery({
    queryKey: ["Profile", token],
    queryFn: getEmployeeProfile,
  });
  
  useEffect(() => {
    console.log(profile);
  });

  useEffect(() => {
    console.log("useEffect ran");
  }, [profile?.progess]);
  

  const employeeTabs = [
    { name: "Education", path: "/profile/education" },
    { name: "Experience", path: "/profile/experience" },
    { name: "Skills", path: "/profile/skill" },
    { name: "Resume", path: "/profile/resume" },
  ];

  const employerTabs = [
    { name: "Overview", path: "/profile" },
    { name: "View Members", path: "/profile/viewemployers" },
    { name: "Add Member", path: "/profile/addemployer" },
    { name: "Apikey", path: "/profile/apikey" },
    { name: "Current Plan ", path: "/profile/currentplan" },
  ];




  const handleKYCVerification = () => {
    navigate("/kyc-verification");
  };


  const handleGetVerified = () => {
    navigate("/Get-Verified");
  };

  
  const handleGetVerifiedEmployer = () => {
    navigate("/kyc-verification");
  };




  const handleExpe = () => {
    navigate("/profile/experience");
  };




  return (
    <div className="profileContainer">
      <div className="profileHeaderContainer shadow">
        <div className="profileMainSection">
          <div className="imageContainer">
            <img src={Img} alt="Profile" />
          </div>

          <div className="textContainer">
            <div className="mainTextContent ">
              <div className="flex flex-row py-2">
                {profile?.isVerified === true ? (
                  <img
                    src={Imgv}
                    className=""
                    style={{
                      width: 40,
                      height: 40,
                    }}
                    alt="Verified"
                  />
                ) : (
                  <p className="text-red-500 px-4">Not Verified</p>
                )}

                <div
                  style={{ marginTop: '4px' }}>
                  <h2 className="font-bold text-4xl mt-2">{`${profile?.first_name} ${profile?.last_name}`}
                  </h2>
                </div>





              </div>
              <h4>
                {type === "EMPLOYEE"
                  ? "Candidate"
                  : !profile?.admin
                    ? "Admin"
                    : "Moderator"}
              </h4>

              <div className="details">
                <FontAwesomeIcon icon={faMessage} />
                <p>{profile?.email}</p>
                <FontAwesomeIcon icon={faPhone} />
                <p>
                  {profile?.contact_number
                    ? profile?.contact_number
                    : "Contact number not added"}
                </p>
                <FontAwesomeIcon icon={faLocation} />
                <p>
                  {profile?.city && profile?.state && profile?.country
                    ? `${profile?.city}, ${profile?.state}, ${profile?.country}`
                    : !profile?.city && profile?.state && profile?.country
                      ? `${profile?.state}, ${profile?.country}`
                      : !profile?.city && !profile?.state && profile?.country
                        ? `${profile?.country}`
                        : ""}
                </p>
              </div>
            </div>

            <div className="buttonContainer">
              <button
                onClick={() => {
                  navigate("/editprofile");
                }}
              >
                <FontAwesomeIcon icon={faGear} />
              </button>
              <button
                onClick={() => {
                  signout(dispatch);
                  navigate("/");
                }}
              >
                <FontAwesomeIcon icon={faSignOut} />
              </button>
            </div>


            {type === "EMPLOYEE" && (  // Conditionally render based on user type
              <div className="profileCompletion">
                <span>Profile Completed:</span>
                <div className="profileCompletionLine">
                  <div
                    className="profileCompletionFill"
                    style={{ width: `${profile?.progess}%` }}
                  ></div>
                </div>
                <div className="profileCompletionDescription">
                  {`${profile?.progess}% profile completed`}
                </div>
                {profile?.progess < 100 && (

                  <div>
                  <h2 className="profileCompletionDescription  "
                    style={{ fontSize: '12px',padding : "1%" }}>
                      Profile </h2>

                      <h2 className="profileCompletionDescription  "
                    style={{ fontSize: '12px',paddingTop : "3%" }}>
                       Incomplete</h2>
                  </div>
                      )}
              </div>
            )}
            

            {profile?.isVerified === false && type === "EMPLOYEE" && (
              <button
                style={{
                  padding: '6px 4px',
                  fontSize: '14px',
                  backgroundColor: '#004aad', // Set the background color to #004aad
                }}
                className="mx-3 text-white rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none"
                onClick={handleGetVerified}
              >
                <span>Get Verified</span>
              </button>
            )}


            {type === "EMPLOYER" && 
               profile?.isVerified === false && (
                <button
                  style={{
                    padding: '6px 8px',
                    fontSize: '14px',
                    width : '15%',
                    backgroundColor: '#004aad', // Set the background color to #004aad
                  }}
                  className="mx-3 text-white rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none"
                  onClick={handleGetVerifiedEmployer}
                >
                  <span>Get Verified</span>
                </button>
              )}







          </div>
        </div>

        <div className="profileNavbarContainer">
          {type === "EMPLOYER" &&
            employerTabs.map((e) => {
              if (
                (e.name === "Add Members" || e.name === "View Members") &&
                profile?.admin
              )
                return;
              return (
                <Link
                  className={
                    `navText ` + (location.pathname === e.path && "active")
                  }
                  to={e.path}
                >
                  {e.name}
                </Link>
              );
            })}

          {type === "EMPLOYEE" &&
            employeeTabs.map((e) => {
              return (
                <Link
                  className={
                    `navText ` + (location.pathname === e.path && "active")
                  }
                  to={e.path}
                >
                  {e.name}
                </Link>
              );
            })}
        </div>
      </div>

      <div className="profileContent">
        {props.children ? props.children : <Outlet />}
      </div>
    </div>
  );
};

export default ProfileLayout;
