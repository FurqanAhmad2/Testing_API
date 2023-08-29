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

const NavbarBtnMobileHover = ({ name, route, closeMenu, options }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <>
        <button
          className="navbarBtnMobile"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <FontAwesomeIcon icon={faBriefcase} />
          <p>For Employers</p>

          <div style={{ justifySelf: "flex-end" }}>
            <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
          </div>
        </button>

        {open && (
          <div
            style={{ backgroundColor: "#fff", width: "100%", paddingLeft: 30 }}
          >
            {options.map((e) => {
              return (
                <a
                  className="megamenuItem"
                  target="_blank"
                  href={e.link}
                  onClick={() => {
                    closeMenu();
                    setOpen(false);
                  }}
                >
                  <FontAwesomeIcon icon={faCircle} />
                  <p>{e.name}</p>
                </a>
              );
            })}
          </div>
        )}
      </>
    </>
  );
};

export default NavbarBtnMobileHover;
