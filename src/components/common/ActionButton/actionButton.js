import "./styles.css";

const ActionButton = ({ text, type, handleClick, style }) => {
  return (
    <button
      className={`actionBtnContainer shadow ${
        type === "outline"
          ? "actionBtnContainerOutline"
          : "actionBtnContainerFilled"
      }`}
      onClick={() => {
        handleClick();
      }}
      style={style}
    >
      {text}
    </button>
  );
};

export default ActionButton;
