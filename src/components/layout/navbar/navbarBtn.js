import { Link } from "react-router-dom";

const NavbarBtn = ({ name, route, isSelected, closeMenu }) => {
  return (
    <Link
      to={route}
      onClick={() => {
        closeMenu();
      }}
    >
      <div className="navbatBtnContainer">
        <button className={`navbarBtn ${isSelected ? "selected" : ""}`}>
          <p>{name}</p>
        </button>
      </div>
    </Link>
  );
};

export default NavbarBtn;
