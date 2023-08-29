import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addYears } from "date-fns";

const SkillForm = ({
  skill,
  setSkill,
  isEdit,
  handleSubmit,
  handleDelete,
  loading,
}) => {
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
          <label>Description</label>
          <input
            type="text"
            class="form-control"
            value={skill.description}
            placeholder="Skill description"
            required
            onChange={(e) => {
              setSkill({
                ...skill,
                description: e.target.value,
              });
            }}
          />
        </div>

        <div class="inputContainers">
          <label>Skill Level</label>
          <select
            class="form-control"
            required
            value={skill.skill_level}
            onChange={(e) => {
              setSkill({
                ...skill,
                skill_level: e.target.value,
              });
            }}
          >
            <option disabled selected value="">
              -- select type --
            </option>
            <option value="BEGINNER">BEGINNER</option>
            <option value="INTERMEDIATE">INTERMEDIATE</option>
            <option value="EXPERT">EXPERT</option>
          </select>
        </div>

        <div class="inputContainers">
          <label>Years of experience</label>
          <input
            type="number"
            class="form-control"
            value={skill.year_of_experience}
            placeholder="2"
            required
            onChange={(e) => {
              setSkill({
                ...skill,
                year_of_experience: e.target.value,
              });
            }}
          />
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

export default SkillForm;
