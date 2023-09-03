import { compose } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import ScreenError from "../../components/common/ScreenError/screenError";
import { getApikey, postApikey, setSubscriptionDetails,getEmployeeProfile } from "../../apicalls";
import ScreenMessage from "../../components/common/ScreenMessage/screenMessage";
import SubHeading1 from "../../components/common/SubHeading1/subHeading1";
import ActionButton from "../../components/common/ActionButton/actionButton";

const ApiKey = () => {
  const { token } = useContext(AuthContext);
  const [apikey, setApikey] = useState("");

  const RefreshApikey = async () => {
    setApikey("***Loading***");
    const res = await postApikey(token);

    if (res === "FAILED") {
      toast("Something Went Wrong!");
      setApikey("------------");
      return;
    }
    setApikey(res.apikey);
  };


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
    console.log(profile?.isVerified);
  });



  return (
    <>
      <div className="profileBanner">
        <div className="bannerContent">
          <h1>Apikey</h1>
        </div>
      </div>

      {profile?.isVerified && (
      <div className="profileMainContainer shadow">
        <div className="apiKeyContainer">
          <SubHeading1 text={"Get APIKEY"} />

          <div>
            <p>Apikey is</p>
            <div className="urlContainer shadow">{apikey}</div>
          </div>

    
         
            <ActionButton
              text="Generate New Apikey"
              handleClick={() => {
                RefreshApikey();
              }}
              style={{ maxWidth: "fit-content" }}
            />
  
        </div>
      </div>

      )} 
      {!profile?.isVerified && (

        <SubHeading1 text={"Please Get Verfiy for getting the APIKEY"} />

      )}

    </>
  );
};

export default ApiKey;
