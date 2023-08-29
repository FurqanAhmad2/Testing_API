import {
  faCalendar,
  faClock,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import "./styles.css";

const Slot = ({ data, noshadow, isDelete, handleDelete }) => {
  const date = format(new Date(data.datetime), "do, MMM, Y");
  const time = format(new Date(data.datetime), "h:mm bb");
  console.log(data);
  return (
    <div className={`slotCard ${!noshadow ? "shadow" : ""}`}>
      <div>
        <div className="rowContainer">
          <FontAwesomeIcon icon={faCalendar} />
          <p>{date}</p>
        </div>

        <div className="rowContainer">
          <FontAwesomeIcon icon={faClock} />
          <p>{time}</p>
        </div>

        {data?.link && (
          <a href={data.link} target="_blank">
            Meeting Link
          </a>
        )}
      </div>

      {isDelete && (
        <button
          className="deleteBtn"
          onClick={() => {
            handleDelete();
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
};

export default Slot;
