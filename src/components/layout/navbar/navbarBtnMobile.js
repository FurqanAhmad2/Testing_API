import {
  faAddressBook,
  faBriefcase,
  faBuilding,
  faCode,
  faFile,
  faHome,
  faMoneyBill,
  faTableColumns,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

const NavbarBtnMobile = ({ name, route, closeMenu }) => {
  const navigate = useNavigate();
  return (
    <button
      className="navbarBtnMobile"
      onClick={() => {
        closeMenu();
        navigate(route);
      }}
    >
      <FontAwesomeIcon
        icon={
          route === "/dashboard"
            ? faTableColumns
            : route === "/uploadresume"
            ? faFile
            : route === "/jobpost"
            ? faBriefcase
            : route === "/company"
            ? faBuilding
            : route === "/contact"
            ? faAddressBook
            : route === "/aboutus"
            ? faUserGroup
            : route === "/plans"
            ? faMoneyBill
            : route === "/knowledgebase"
            ? faCode
            : faBriefcase
        }
      />
      <p>{name}</p>
    </button>
  );
};

export default NavbarBtnMobile;
