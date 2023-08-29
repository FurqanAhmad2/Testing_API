import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const NavbarBtnHover = ({ colorchange, name, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseOver={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <button className="jobButton">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: colorchange ? "#fff" : "#000000",
          }}
        >
          <h5
            style={{
              color: colorchange ? "#fff" : "#000000",
            }}
          >
            {name}
          </h5>
          <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
        </div>

        {open ? (
          <div
            className="submenu shadow"
            onMouseOver={() => {
              setOpen(true);
            }}
            onMouseLeave={() => {
              setOpen(false);
            }}
          >
            {options.map((e) => {
              return (
                <a className="submenuItem" target="_blank" href={e.link}>
                  <p>{e.name}</p>
                </a>
              );
            })}
          </div>
        ) : null}
      </button>
    </div>
  );
};

export default NavbarBtnHover;
