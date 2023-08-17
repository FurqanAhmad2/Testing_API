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
} from "recharts";
import { getDeiStatsByCandidateId } from "../../apicalls";
import FaqBtn from "../../components/common/faqBtn";
import Spinner from "../../components/common/spinner";
import { AuthContext } from "../../context/AuthContext";
import ScreenPermissionError from "../../components/common/ScreenPermissionError/screenPermissionError";

const EmployeeJobDei = () => {
  const { jobId } = useParams();
  const { employeeId } = useParams();
  const { token, subscriptionDetails } = useContext(AuthContext);
  const [stats, setStats] = useState([]);

  const {
    isError: deiError,
    isLoading: deiLoading,
    data: deiData,
  } = useQuery({
    queryKey: [`DeiStatsCandidateId${jobId}${employeeId}`, token, employeeId],
    queryFn: getDeiStatsByCandidateId,
    enabled: subscriptionDetails?.permissionIdList?.includes(12),
  });

  useEffect(() => {
    if (deiData?.length) {
      let dei = deiData;
      let obj = {};

      for (let i = 0; i < dei.length; i++) {
        if (!obj[dei[i].question.id]) {
          obj = {
            ...obj,
            [dei[i].question.id]: {
              correct: dei[i].correct ? 1 : 0,
              wrong: dei[i].correct ? 0 : 1,
              question: dei[i].question,
              answer: dei[i].answer,
            },
          };
        } else {
          if (dei[i].correct) {
            obj = {
              ...obj,
              [dei[i].question.id]: {
                correct: obj[dei[i].question.id].correct + 1,
                wrong: obj[dei[i].question.id].wrong,
                question: dei[i].question,
                answer: dei[i].answer,
              },
            };
          } else {
            obj = {
              ...obj,
              [dei[i].question.id]: {
                correct: obj[dei[i].question.id].correct,
                wrong: obj[dei[i].question.id].wrong + 1,
                question: dei[i].question,
                answer: dei[i].answer,
              },
            };
          }
        }
      }
      let keys = Object.keys(obj);
      let arr = [];
      keys.forEach((key, index) => {
        arr.push({
          correct: obj[key].correct,
          wrong: obj[key].wrong,
          index: index + 1,
          question: obj[key].question,
          answer: obj[key].answer,
        });
      });
      setStats([...arr]);
    }
  }, [deiData]);

  if (subscriptionDetails?.permissionIdList?.includes(12)) {
    if (deiLoading)
      return (
        <div className="loadingScreen">
          <Spinner />
        </div>
      );

    return (
      <>
        <div className="banner">
          <div className="bannerContent">
            <h1>DEI</h1>
            <div className="imgContainer">
              {/* <img src={AboutUsBanner} /> */}
            </div>
          </div>
        </div>

        <div className="deiStatsPageContainer">
          <div className="deiStatsPageContent">
            <div className="questionsContainer">
              {stats?.map((e) => {
                return (
                  <FaqBtn
                    data={{
                      question: `${e.index}. ${e.question.question_text} `,
                      answerList: [],
                      answer: e.answer,
                      ending: "",
                    }}
                    secondaryTitle={e.correct ? "Correct" : "Incorrect"}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  } else return <ScreenPermissionError />;
};

export default EmployeeJobDei;
