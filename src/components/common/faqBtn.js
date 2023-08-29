import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const FaqBtn = ({ data, secondaryTitle }) => {
  const [open, setOpen] = useState(false);

  return (
    <button
      className="faqBtn shadow"
      onClick={() => {
        setOpen(!open);
      }}
    >
      <div className="header">
        <div>
          <p>{data.question}</p>
          {secondaryTitle && <p className="secondary">{secondaryTitle}</p>}
        </div>
        <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
      </div>

      {open ? (
        <div className="textContent">
          {data.answer ? <p>{data.answer}</p> : null}

          {data.answerList.length ? (
            <ul className="ulList">
              {data.answerList.map((e) => {
                return (
                  <li>
                    <p>{e}</p>
                  </li>
                );
              })}
            </ul>
          ) : null}

          {data.ending ? <p>{data.ending}</p> : null}
        </div>
      ) : null}
    </button>
  );
};

export default FaqBtn;
