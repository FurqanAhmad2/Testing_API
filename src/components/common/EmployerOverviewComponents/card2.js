import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Row1 from "./row1";

const Card2 = ({ title, subheading, data }) => {
  return (
    <>
      <div className="card2 shadow">
        <p className="title1">{title}</p>
        <p className="title2">{subheading}</p>

        <div className="rowContainer">
          {data.map((e) => {
            return <Row1 title={e.name} />;
          })}

          {!data.length ? <p>No data yet!</p> : null}
        </div>
      </div>
    </>
  );
};

export default Card2;
