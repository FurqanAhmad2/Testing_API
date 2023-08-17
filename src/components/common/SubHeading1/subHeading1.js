import "./styles.css";

const SubHeading1 = ({ text, style, type }) => {
  return (
    <h2
      className={`subHeading1 ${
        type === "light" ? "subHeading1_light" : "subHeading1_dark"
      }`}
      style={style}
    >
      {text}
    </h2>
  );
};

export default SubHeading1;
