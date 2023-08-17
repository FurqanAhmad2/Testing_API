import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addYears } from "date-fns";

const EducationForm = ({
  education,
  setEducation,
  isEdit,
  handleSubmit,
  handleDelete,
  loading,
}) => {
  const Years = Array.from(
    { length: 80 },
    (_, i) => addYears(new Date(), 10).getFullYear() - i
  );

  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <form
        style={{ marginTop: 20 }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div class="inputContainers">
          <label>Institute</label>
          <input
            type="text"
            class="form-control"
            value={education.institute}
            placeholder="Name of institute"
            onChange={(e) => {
              setEducation({
                ...education,
                institute: e.target.value,
              });
            }}
          />
        </div>

        <div class="inputContainers">
          <label>Education Type</label>
          <input
            type="text"
            class="form-control"
            value={education.education_type}
            placeholder="Bachelors"
            onChange={(e) => {
              setEducation({
                ...education,
                education_type: e.target.value,
              });
            }}
          />
        </div>

        <div class="inputContainers">
          <label>CGPA</label>
          <input
            type="text"
            class="form-control"
            value={education.cgpa}
            placeholder="8.5"
            onChange={(e) => {
              setEducation({
                ...education,
                cgpa: e.target.value,
              });
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 15 }}>
          <div class="inputContainers">
            <label>Start Year</label>
            <select
              class="form-control"
              required
              value={education.starting_year}
              onChange={(e) => {
                setEducation({
                  ...education,
                  starting_year: e.target.value,
                });
              }}
            >
              <option disabled selected value="">
                Year
              </option>
              {Years?.map((e) => {
                return <option value={e}>{e}</option>;
              })}
            </select>
          </div>

          <div class="inputContainers">
            <label>Start Month</label>
            <select
              class="form-control"
              required
              value={education.starting_month}
              onChange={(e) => {
                setEducation({
                  ...education,
                  starting_month: e.target.value,
                });
              }}
            >
              <option disabled selected value="">
                Month
              </option>
              {Months?.map((e) => {
                return <option value={e.toUpperCase()}>{e}</option>;
              })}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: 15 }}>
          <div class="inputContainers">
            <label>End Year</label>
            <select
              class="form-control"
              required
              value={education.completion_year}
              onChange={(e) => {
                setEducation({
                  ...education,
                  completion_year: e.target.value,
                });
              }}
            >
              <option disabled selected value="">
                Year
              </option>
              {Years?.map((e) => {
                return <option value={e}>{e}</option>;
              })}
            </select>
          </div>

          <div class="inputContainers">
            <label>End Month</label>
            <select
              class="form-control"
              required
              value={education.completion_month}
              onChange={(e) => {
                setEducation({
                  ...education,
                  completion_month: e.target.value,
                });
              }}
            >
              <option disabled selected value="">
                Month
              </option>
              {Months?.map((e) => {
                return <option value={e.toUpperCase()}>{e}</option>;
              })}
            </select>
          </div>
        </div>

        <div class="inputContainers">
          <label>Is Ongoing?</label>
          <select
            class="form-control"
            required
            value={education.ongoing}
            onChange={(e) => {
              setEducation({
                ...education,
                ongoing: e.target.value,
              });
            }}
          >
            <option disabled selected value="">
              -- is ongoing --
            </option>
            <option value={"Y"}>Yes</option>
            <option value={"N"}>No</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className="button">
            {loading ? "Loading..." : "Submit"}
          </button>

          {isEdit ? (
            <button
              style={{ padding: 10, fontSize: 18, color: "red" }}
              type="button"
              onClick={() => {
                handleDelete();
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : null}
        </div>
      </form>
    </>
  );
};

export default EducationForm;
