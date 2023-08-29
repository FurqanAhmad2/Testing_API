import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  getDeiImages,
  getDeiOrientations,
  getDeiQuestions,
  getDeiRaces,
  getDeiText,
  postDeiQuestions,
  postDeiRaceOrientation,
} from "../../apicalls";
import ActionButton from "../../components/common/ActionButton/actionButton";
import Spinner from "../../components/common/spinner";
import SubHeading1 from "../../components/common/SubHeading1/subHeading1";
import TextContent1 from "../../components/common/TextContent1/textContent1";
import { AuthContext } from "../../context/AuthContext";
import HomeImg1 from "../../img/homeImg1.png";
import { FormLabel, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { toast } from "react-toastify";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";

const EmployeeDei = () => {
  const { token } = useContext(AuthContext);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [raceorientation, setRaceorientation] = useState({
    race: null,
    sexual_orientaion: null,
  });
  const [loading, setLoading] = useState(false);

  const { isLoading: textLoading, data: text } = useQuery({
    queryKey: [`DeiText`, token],
    queryFn: getDeiText,
  });
  const { isLoading: imageLoading, data: image } = useQuery({
    queryKey: [`DeiImage`, token],
    queryFn: getDeiImages,
  });

  const { isLoading: orientationLoading, data: orientation } = useQuery({
    queryKey: [`DeiOrientation`, token],
    queryFn: getDeiOrientations,
  });

  const { isLoading: raceLoading, data: race } = useQuery({
    queryKey: [`DeiRace`, token],
    queryFn: getDeiRaces,
  });

  const HandleRaceOrientationSubmit = () => {
    if (!raceorientation.race) {
      toast("Choose your race");
      return;
    }
    if (!raceorientation.sexual_orientaion) {
      toast("Choose your sexual orientation");
      return;
    }
    setLoading(true);
    postDeiRaceOrientation(token, raceorientation, toast, setLoading, navigate);
    console.log(raceorientation);
  };

  if (textLoading || imageLoading || orientationLoading || raceLoading)
    return <ScreenLoading />;

  return (
    <div className="deiPageContainer">
      <div className="deiPageContent">
        {textLoading ? (
          <Spinner />
        ) : text ? (
          text && text[0] ? (
            <div className="textContainer">
              {text[0].content.split("\r\n•\t").map((e, index) => {
                if (index === 0) return;
                return (
                  <div className="subSection">
                    <div
                      className={`subSectionContent ${
                        index % 2 === 0 ? "oppositeDirection" : ""
                      }`}
                    >
                      <div className="imgContainer">
                        <img src={image[index].image} />
                      </div>

                      <div className="textContainer">
                        <TextContent1 text={e} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null
        ) : null}

        <div className="raceorientationContainer">
          <div>
            <h4>Orientation</h4>
            <select
              className="loginInput"
              required
              onChange={(e) => {
                setRaceorientation({
                  ...raceorientation,
                  sexual_orientaion: e.target.value,
                });
              }}
            >
              <option disabled selected value="">
                -- select a orientation --
              </option>
              {orientation?.map((e) => {
                return <option value={e.id}>{e.orientation}</option>;
              })}
            </select>
          </div>
          <div>
            <h4>Race</h4>
            <select
              className="loginInput"
              required
              onChange={(e) => {
                setRaceorientation({
                  ...raceorientation,
                  race: e.target.value,
                });
              }}
            >
              <option disabled selected value="">
                -- select a race --
              </option>
              {race?.map((e) => {
                return <option value={e.id}>{e.race}</option>;
              })}
            </select>
          </div>
          <ActionButton
            text={loading ? "Loading..." : "Submit"}
            handleClick={() => {
              HandleRaceOrientationSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDei;
