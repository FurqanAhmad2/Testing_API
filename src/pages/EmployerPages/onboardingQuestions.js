import { useParams } from "react-router-dom";

import { useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteJobOnboardingQuestion,
  deleteJobQuestion,
  getJobOnboardingQuestions,
  getJobQuestions,
  postJobOnboardingQuestion,
  postJobQuestion,
} from "../../apicalls";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/common/spinner";
import QuestionSection from "../../components/common/QuestionSection/questionSection";

const Onboardingquestion = () => {
  const { token } = useContext(AuthContext);
  const { jobId } = useParams();

  const [loading, setLoading] = useState(false);
  const {
    isError: questionError,
    isLoading: questionLoading,
    data: question,
    refetch,
  } = useQuery({
    queryKey: [`OnboardingQuestionsOfJob${jobId}`, token, jobId],
    queryFn: getJobOnboardingQuestions,
  });

  const HandleSubmit = async (type, formData, options) => {
    setLoading(true);
    if (type === "MCQ") {
      const data = [
        {
          job: jobId,
          question_text: formData.question_text,
          question_answers: options.join(","),
          question_type: type,
        },
      ];

      const res = await postJobOnboardingQuestion(
        token,
        data,
        toast,
        setLoading
      );
      refetch();
    } else {
      const data = [
        {
          job: jobId,
          question_text: formData.question_text,
          question_type: type,
        },
      ];

      const res = await postJobOnboardingQuestion(
        token,
        data,
        toast,
        setLoading
      );
      refetch();
    }
  };

  const HandleDelete = async (id) => {
    const res = await deleteJobOnboardingQuestion(token, id, toast);
    refetch();
  };

  if (questionLoading)
    return (
      <div className="loadingContainer">
        <Spinner />
      </div>
    );

  if (questionError)
    return (
      <div className="loadingContainer">
        <h1>Error</h1>
      </div>
    );

  return (
    <QuestionSection
      data={question}
      loading={loading}
      handleSubmit={(type, data, options) => {
        HandleSubmit(type, data, options);
      }}
      handleDelete={(id) => {
        HandleDelete(id);
      }}
    />
  );
};

export default Onboardingquestion;
