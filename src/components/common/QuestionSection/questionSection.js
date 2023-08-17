import "./styles.css";
import { useEffect, useState } from "react";
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

const QuestionSection = ({ data, loading, handleSubmit, handleDelete }) => {
  const [formData, setFormData] = useState({
    question_text: "",
    question_answers: "",
  });
  const [type, setType] = useState("MCQ");
  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");

  useEffect(() => {
    setFormData({
      ...formData,
      question_text: "",
      question_answers: "",
    });
    setOptions([]);
    setOptionInput("");
  }, [type]);

  return (
    <div className="questionPageContainer">
      <div className="questionPageContent">
        <div className="questionInputContainer shadow">
          <h4>Create Questions</h4>

          <div className="btnTypeContainer">
            <button
              className={`typeBtn ${type === "MCQ" ? "selected" : ""}`}
              onClick={() => {
                setType("MCQ");
              }}
            >
              <p>MCQ</p>
            </button>

            <button
              className={`typeBtn ${type === "TEXT" ? "selected" : ""}`}
              onClick={() => {
                setType("TEXT");
              }}
            >
              <p>Text</p>
            </button>
          </div>

          <div style={{ paddingTop: 20 }}>
            <div>
              <label>Question</label>
              <input
                type="text"
                className="form-control"
                placeholder="Write question here..."
                value={formData.question_text}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    question_text: e.target.value,
                  });
                }}
              />
            </div>

            {type === "MCQ" ? (
              <>
                <div>
                  <label>MCQ Options</label>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Option1"
                      value={optionInput}
                      onChange={(e) => {
                        setOptionInput(e.target.value);
                      }}
                    />
                    <button
                      className="button"
                      style={{
                        maxWidth: 50,
                        maxHeight: 50,
                        marginLeft: 5,
                      }}
                      onClick={() => {
                        if (optionInput) {
                          setOptions([...options, optionInput]);
                          setOptionInput("");
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>

                {options.map((e, index) => {
                  return (
                    <li
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: 10,
                      }}
                    >
                      <h4>{e}</h4>
                      <button
                        className="deleteBtn"
                        onClick={() => {
                          let arr = [...options];
                          arr.splice(index, 1);
                          setOptions([...arr]);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  );
                })}
              </>
            ) : null}
          </div>

          <div style={{ display: "grid", placeItems: "center" }}>
            <button
              className="button"
              onClick={() => {
                handleSubmit(type, formData, options);
              }}
            >
              <p>{loading ? "Loading..." : "Add"}</p>
            </button>
          </div>
        </div>

        <div className="questionInputContainer shadow">
          {!data?.length ? <h4>No Questions Added</h4> : null}
          <div className="formCards">
            {data.map((e) => {
              if (e.question_type === "MCQ") {
                return (
                  <div className="formRow">
                    <div className="header">
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        className="formLabel"
                      >
                        {e.question_text}
                      </FormLabel>

                      <button
                        className="deleteBtn"
                        onClick={() => {
                          handleDelete(e.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>

                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
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
                    <div className="header">
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        className="formLabel"
                      >
                        {e.question_text}
                      </FormLabel>

                      <button
                        className="deleteBtn"
                        onClick={() => {
                          handleDelete(e.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>

                    <TextField
                      id="outlined-basic"
                      placeholder="Type your answer..."
                      variant="outlined"
                      size="large"
                      inputProps={{ style: { fontSize: 18 } }}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;
