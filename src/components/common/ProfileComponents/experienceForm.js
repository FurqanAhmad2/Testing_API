import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addYears } from "date-fns";

const ExperienceForm = ({
  experience,
  setExperience,
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
          <label>Job Title</label>
          <input
            type="text"
            class="form-control"
            value={experience.job_title}
            placeholder="App Developer"
            onChange={(e) => {
              setExperience({
                ...experience,
                job_title: e.target.value,
              });
            }}
          />
        </div>

        <div class="inputContainers">
          <label>Company Name</label>
          <input
            type="text"
            class="form-control"
            value={experience.company_name}
            placeholder="Infotech Pvt Ltd"
            onChange={(e) => {
              setExperience({
                ...experience,
                company_name: e.target.value,
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
              value={experience.starting_year}
              onChange={(e) => {
                setExperience({
                  ...experience,
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
              value={experience.starting_month}
              onChange={(e) => {
                setExperience({
                  ...experience,
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
              value={experience.completion_year}
              onChange={(e) => {
                setExperience({
                  ...experience,
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
              value={experience.completion_month}
              onChange={(e) => {
                setExperience({
                  ...experience,
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

export default ExperienceForm;
