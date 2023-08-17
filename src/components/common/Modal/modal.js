import "./styles.css";

import ReactModal from "react-modal";

const Modal = ({ modal, setModal, children, fitContent }) => {
  return (
    <ReactModal
      isOpen={modal}
      onRequestClose={() => {
        setModal(null);
      }}
      contentLabel="Example Modal"
      className={`modalContainer ${!fitContent ? "modalMaxWidth" : ""}`}
    >
      <div className="modalContent shadow">{children}</div>
    </ReactModal>
  );
};

export default Modal;
