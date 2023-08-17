import { useParams } from "react-router-dom";
import {
  TextField,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Modal,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteJobQuestion,
  getJobQuestions,
  postJobQuestion,
} from "../../apicalls";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/common/spinner";
import QuestionSection from "../../components/common/QuestionSection/questionSection";

const Jobquestion = () => {
  const { token } = useContext(AuthContext);
  const { jobId } = useParams();

  const [loading, setLoading] = useState(false);

  const {
    isError: questionError,
    isLoading: questionLoading,
    data: question,
    refetch,
  } = useQuery({
    queryKey: [`QuestionsOfJob${jobId}`, token, jobId],
    queryFn: getJobQuestions,
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

      const res = await postJobQuestion(token, data, toast, setLoading);
      refetch();
    } else {
      const data = [
        {
          job: jobId,
          question_text: formData.question_text,
          question_type: type,
        },
      ];

      const res = await postJobQuestion(token, data, toast, setLoading);
      refetch();
    }
  };

  const HandleDelete = async (id) => {
    const res = await deleteJobQuestion(token, id, toast);
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

export default Jobquestion;
