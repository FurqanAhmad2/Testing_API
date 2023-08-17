import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { getDeiRaces, getDeiStatsByJobId } from "../../apicalls";
import BarChartContent from "../../components/common/BarChart/barChartContent";
import Spinner from "../../components/common/spinner";
import SubHeading1 from "../../components/common/SubHeading1/subHeading1";
import TableContent from "../../components/common/Table/tableContent";
import { AuthContext } from "../../context/AuthContext";
import ScreenPermissionError from "../../components/common/ScreenPermissionError/screenPermissionError";

const EmployerDei = () => {
  const { jobId } = useParams();
  const { token, subscriptionDetails } = useContext(AuthContext);
  const [data, setData] = useState({});

  const {
    isError: deiError,
    isLoading: deiLoading,
    data: deiData,
  } = useQuery({
    queryKey: [`DeiStats${jobId}`, token, jobId],
    queryFn: getDeiStatsByJobId,
    enabled: subscriptionDetails?.permissionIdList?.includes(12),
  });

  useEffect(() => {
    if (deiData) {
      let raceData = [];
      let orientationData = [];
      let races = {};
      let orientations = {};

      for (let i = 0; i < deiData.races.length; i++) {
        raceData.push({ ...deiData.races[i], total: 0 });
        races = { ...races, [deiData.races[i].id]: deiData.races[i].race };
      }

      for (let i = 0; i < deiData.orientations.length; i++) {
        orientationData.push({ ...deiData.orientations[i], total: 0 });
        orientations = {
          ...orientations,
          [deiData.orientations[i].id]: deiData.orientations[i].orientation,
        };
      }

      for (let i = 0; i < deiData.race_data.length; i++) {
        if (deiData.race_data[i].employee__race) {
          for (let j = 0; j < raceData.length; j++) {
            if (raceData[j].id === deiData.race_data[i].employee__race) {
              raceData[j].total = deiData.race_data[i].total;
            }
          }
        }
      }

      for (let i = 0; i < deiData.sexual_orientation_data.length; i++) {
        if (deiData.sexual_orientation_data[i].employee__sexual_orientation) {
          for (let j = 0; j < raceData.length; j++) {
            if (
              orientationData[j].id ===
              deiData.sexual_orientation_data[i].employee__sexual_orientation
            ) {
              orientationData[j].total =
                deiData.sexual_orientation_data[i].total;
            }
          }
        }
      }

      const groupLabelsData = (data, keyName) => {
        let label = [];
        let value = [];
        for (let i = 0; i < data.length; i++) {
          label.push(data[i][keyName]);
          value.push(data[i].total);
        }

        return { label, value };
      };

      setData({
        raceData: groupLabelsData(raceData, "race"),
        genderData: groupLabelsData(orientationData, "orientation"),
      });
    }
  }, [deiData]);

  if (subscriptionDetails?.permissionIdList?.includes(12)) {
    if (deiLoading)
      return (
        <div className="loadingScreen">
          <Spinner />
        </div>
      );

    if (deiError) return <h1>Error</h1>;

    return (
      <>
        <div className="banner">
          <div className="bannerContent">
            <h1>DEI</h1>
          </div>
        </div>

        <div className="deiStatsPageContainer">
          <div className="deiStatsPageContent">
            <div>
              <div className="statsContainer2">
                <TableContent title="Race" data={data.raceData} />
                <TableContent title="Gender" data={data.genderData} />
              </div>
              <div className="statsContainer">
                <BarChartContent
                  title={"Race"}
                  data={data.raceData}
                  color="#3f9cf5"
                />

                <BarChartContent
                  title={"Gender"}
                  data={data.genderData}
                  color="#7638e7"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else return <ScreenPermissionError />;
};

export default EmployerDei;
