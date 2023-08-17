import "./styles.css";
import { FormLabel, FormControlLabel, RadioGroup, Radio } from "@mui/material";
const QuestionForm = ({
  data,
  answers,
  setAnswers,
  resumes,
  setResume,
  loading,
  handleSubmit,
}) => {
  return (
    <div className="questionContent">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="form"
      >
        {data?.map((e) => {
          if (e.question_type === "MCQ") {
            return (
              <div className="formRow">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className="formLabel"
                >
                  {e.question_text}
                </FormLabel>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onChange={(f) => {
                    setAnswers({
                      ...answers,
                      [e.id]: f.target.value,
                    });
                  }}
                >
                  {e.question_answers.split(",").map((f) => {
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
            );
          } else {
            return (
              <div className="formRow">
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  className="formLabel"
                >
                  {e.question_text}
                </FormLabel>

                <input
                  id="outlined-basic"
                  placeholder="Type your answer..."
                  class="form-control"
                  onChange={(f) => {
                    setAnswers({
                      ...answers,
                      [e.id]: f.target.value,
                    });
                  }}
                />
              </div>
            );
          }
        })}

        {resumes ? (
          <div class="formRow">
            <label>Choose Resume</label>
            <select
              class="form-control"
              required
              onChange={(e) => {
                setResume(e.target.value);
              }}
            >
              <option disabled selected value="">
                -- select resume --
              </option>

              {resumes?.map((e, index) => {
                return <option value={e.id}>{`Resume ${index + 1}`}</option>;
              })}
            </select>
            <label>This resume will be visible to the employer</label>
          </div>
        ) : null}

        <button type="submit" className="button">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
