import "./styles.css";

const Heading1 = ({ text, style, type }) => {
  return (
    <h2
      className={`heading1 ${
        type === "light" ? "heading1_light" : "heading1_dark"
      }`}
      style={style}
    >
      {text}
    </h2>
  );
};

export default Heading1;
