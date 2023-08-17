import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  getDeiImages,
  getDeiQuestions,
  getDeiText,
  postDeiQuestions,
} from "../../apicalls";
import ActionButton from "../../components/common/ActionButton/actionButton";
import Spinner from "../../components/common/spinner";
import SubHeading1 from "../../components/common/SubHeading1/subHeading1";
import TextContent1 from "../../components/common/TextContent1/textContent1";
import { AuthContext } from "../../context/AuthContext";
import HomeImg1 from "../../img/homeImg1.png";
import { FormLabel, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { toast } from "react-toastify";

const EmployeeDeiQuiz = () => {
  const { token } = useContext(AuthContext);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [quizCounter, setQuizCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const { isLoading: questionLoading, data: question } = useQuery({
    queryKey: [`DeiQuestion`, token],
    queryFn: getDeiQuestions,
  });

  const HandleQuizSubmit = async () => {
    let arr = [];
    for (let key in answers) {
      arr.push({ question: key, answer: answers[key], job: jobId });
    }

    if (arr.length !== question?.length) {
      toast("Answers all questions");
      return;
    }

    setLoading(true);
    const res = await postDeiQuestions(token, arr, toast, setLoading, navigate);
  };
  console.log(answers);
  if (questionLoading) return <Spinner />;

  return (
    <div className="deiPageContainer">
      <div className="deiPageContent">
        <div className="quizContainer">
          <div className="quizStart">
            <SubHeading1 text={`Question ${quizCounter + 1}`} />
            <div className="quizForm">
              <div className="formRow">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className="formLabel"
                >
                  {question[quizCounter].question_text}
                </FormLabel>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={answers[question[quizCounter].id]}
                  defaultValue={""}
                  onChange={(f) => {
                    setAnswers({
                      ...answers,
                      [question[quizCounter].id]: f.target.value,
                    });
                  }}
                >
                  {question[quizCounter].question_answers
                    .split(".,")
                    .map((f) => {
                      return (
                        <FormControlLabel
                          value={f}
                          control={<Radio />}
                          label={f}
                        />
                      );
                    })}
                </RadioGroup>
              </div>
            </div>
            <div className="nextPrevBtns">
              <div className="prevBtn">
                {quizCounter !== 0 ? (
                  <ActionButton
                    text={"Back"}
                    handleClick={() => {
                      setQuizCounter(quizCounter - 1);
                    }}
                    type={"outline"}
                  />
                ) : null}
              </div>

              <div className="nextBtn">
                <ActionButton
                  text={
                    loading
                      ? "Loading..."
                      : quizCounter !== question.length - 1
                      ? "Next"
                      : "Submit"
                  }
                  handleClick={() => {
                    if (quizCounter === question.length - 1) HandleQuizSubmit();
                    else setQuizCounter(quizCounter + 1);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDeiQuiz;
