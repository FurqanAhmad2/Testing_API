import {
  faAddressBook,
  faAngleDown,
  faAngleUp,
  faBriefcase,
  faBuilding,
  faCode,
  faFile,
  faHome,
  faMagnifyingGlass,
  faMoneyBill,
  faTableColumns,
  faUserGroup,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../../apicalls";

const NavbarBtnMobileMega = ({ name, route, closeMenu }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const allCategories =
    JSON.parse(localStorage.getItem("ATS_JobCategories")) || [];

  const healthallCategories =
    JSON.parse(localStorage.getItem("ATS_HealthJobCategories")) || [];

  return (
    <>
      <button
        className="navbarBtnMobile"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <p>Find Jobs</p>

        <div style={{ justifySelf: "flex-end" }}>
          <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
        </div>
      </button>

      {open && (
        <div
          style={{ backgroundColor: "#fff", width: "100%", paddingLeft: 30 }}
        >
          <p>Jobs</p>
          {allCategories?.splice(0, 4)?.map((e) => {
            return (
              <button
                className="megamenuItem"
                onClick={() => {
                  closeMenu();
                  navigate(`/jobs?category=${e.id}`);
                  setOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faCircle} />
                <p>{e.name}</p>
              </button>
            );
          })}
          <p>Health Jobs</p>
          {healthallCategories?.splice(0, 4)?.map((e) => {
            return (
              <button
                className="megamenuItem"
                onClick={() => {
                  closeMenu();
                  navigate(`/jobs?category=${e.id}`);
                  setOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faCircle} />
                <p>{e.name}</p>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default NavbarBtnMobileMega;
