import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";

const Searchbar = ({
  searchterm,
  setSearchterm,
  placeholder,
  handleSubmit,
}) => {
  return (
    <div className="searchBarContainer shadow">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="searchbar"
      >
        <input
          className="searchInput"
          placeholder={placeholder}
          type="text"
          required
          value={searchterm}
          onChange={(e) => setSearchterm(e.target.value)}
        />

        <div>
          <button className="submitBtnContainer" type="submit">
            <div className="iconContainer">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
