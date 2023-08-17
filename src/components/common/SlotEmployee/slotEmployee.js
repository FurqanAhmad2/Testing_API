import {
  faCalendar,
  faClock,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import ActionButton from "../ActionButton/actionButton";
import "./styles.css";
import { useState } from "react";

const SlotEmployee = ({ data, handleSubmit }) => {
  const date = format(new Date(data.datetime), "do, MMM, Y");
  const time = format(new Date(data.datetime), "h:mm bb");
  const [loading, setLoading] = useState(false);
  return (
    <div
      className={`employeeSlotCard shadow ${
        data.is_available ? "slotAvailable" : "slotUnvailable"
      }`}
    >
      <div>
        <div className="rowContainer">
          <FontAwesomeIcon icon={faCalendar} />
          <p>{date}</p>
        </div>

        <div className="rowContainer">
          <FontAwesomeIcon icon={faClock} />
          <p>{time}</p>
        </div>
      </div>

      <ActionButton
        text={loading ? "Loading..." : data.is_available ? "Book" : "Booked"}
        handleClick={() => {
          if (data.is_available) {
            setLoading(true);
            handleSubmit(setLoading);
          }
        }}
      />
    </div>
  );
};

export default SlotEmployee;
