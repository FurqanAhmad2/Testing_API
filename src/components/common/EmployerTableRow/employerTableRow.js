import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDotCircle,
  faEllipsisVertical,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import Modal from "../Modal/modal";
import ActionButton from "../ActionButton/actionButton";
import { deleteEmployer, patchEmployer } from "../../../apicalls";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

const EmployerTableRow = ({ data, refetch }) => {
  const { token } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(data?.type);
  const [loading, setLoading] = useState(false);

  const HandleSubmitType = async () => {
    setLoading(true);
    await patchEmployer(token, { user: data.id, role: type }, toast);
    setModal(false);
    refetch();
    setLoading(false);
  };

  const HandleDelete = async () => {
    setLoading(true);
    await deleteEmployer(token, { user: data.id });
    setModal(false);
    refetch();
    setLoading(false);
  };

  return (
    <>
      <tr className="employerTableRowContainer">
        <td>
          <div className="symbol symbol-50px me-2">
            <span className="symbol-label bg-light-danger">
              <FontAwesomeIcon icon={faDotCircle} />
            </span>
          </div>
        </td>
        <td style={{ width: "100% !important" }}>
          <span className="text-dark fw-bold text-hover-primary mb-1 fs-6">
            {`${data.first_name} ${data.last_name}`}
          </span>
          <span className="text-muted fw-semibold d-block fs-7">
            {data.email}
          </span>
        </td>
        <td style={{ width: 117 }}>
          <span className="text-dark fw-bold d-block fs-7">
            {data.role.toUpperCase() || "UNSPECIFIED"}
          </span>
        </td>
        <td className="text-end">
          <button
            className="btn-bg-light btn-active-color-primary fs-6"
            onClick={() => {
              setModal(true);
            }}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </td>

        <Modal modal={modal} setModal={setModal} fitContent="true">
          <div className="employerSubMenu">
            <div className="header">
              <button
                className="closeBtn"
                onClick={() => {
                  setModal(false);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="type">
              <select
                className="loginInput"
                required
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>

              <div className="buttonContainer">
                <ActionButton
                  text={loading ? "Loading..." : "Submit"}
                  handleClick={() => {
                    HandleSubmitType();
                  }}
                />

                <button
                  className="deleteBtn"
                  onClick={() => {
                    HandleDelete();
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />

                  <p>Delete</p>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </tr>
    </>
  );
};

export default EmployerTableRow;
