import "./styles.css";

const TextContent1 = ({ text, style, type }) => {
  return (
    <p
      className={`textContent1 ${
        type === "light" ? "textContent1_light" : "textContent1_dark"
      }`}
      style={style}
    >
      {text}
    </p>
  );
};

export default TextContent1;
