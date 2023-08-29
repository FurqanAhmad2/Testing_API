import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import NavbarLogo from "../../../img/navbarLogo.png";
import NavbarBtnHover from "./navbarBtnHover";
import useWindow from "../../../hooks/useWindow";
import NavbarBtnMobile from "./navbarBtnMobile";
import ActionButton from "../../common/ActionButton/actionButton";
import NavbarMegamenu from "./navbarMegamenu";
import NavbarBtnMobileMega from "./navbarBtnMobileMega";
import NavbarBtnMobileHover from "./navbarBtnMobileHover";

const Navbar = () => {
  const { width } = useWindow();
  const navigate = useNavigate();
  const { token, type } = useContext(AuthContext);
  const location = useLocation();
  const [colorchange, setColorchange] = useState(true);
  const [menu, setMenu] = useState(false);
  const isMobile = width <= 1150;

  // const changeNavbarColor = () => {
  //   if (window.scrollY >= 50) {
  //     setColorchange(true);
  //   } else {
  //     setColorchange(false);
  //   }
  // };

  // window.addEventListener("scroll", changeNavbarColor);

  const employeeRoutes = [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/uploadresume", name: "Resume" },
  ];
  const employerRoutes = [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/jobpost", name: "Post Job" },
  ];
  const commonRoutes = [
    { path: "/jobs", name: "Find Jobs" },
    { path: "/foremployers", name: "For Employer" },
    { path: "/ldpca", name: "LDPCA"},
    { path: "/contact", name: "Contact" },
    { path: "/aboutus", name: "About Us" },
    
  ];

  return (
    <div
      className={`navbarContainer ${
        colorchange ? "navbarScrolled shadow" : ""
      }`}
    >
      <Link to="/">
        <img className="navbarLogo" src={NavbarLogo} />
      </Link>

      <div className="navbarSubContainer">
        <div className="navbarContent">
          {!isMobile ? (
            token && type === "EMPLOYEE" ? (
              <>
                {employeeRoutes.map((e) => {
                  return (
                    <Link to={e.path}>
                      <button
                        className={`jobButton ${
                          location.pathname.includes(e.path.substring(1))
                            ? "selected"
                            : ""
                        }`}
                      >
                        <h5
                          style={{
                            color:
                              location.pathname === "/" && !colorchange
                                ? "#fff"
                                : "#000000",
                          }}
                        >
                          {e.name}
                        </h5>
                      </button>
                    </Link>
                  );
                })}
              </>
            ) : token && type === "EMPLOYER" ? (
              <>
                {employerRoutes.map((e) => {
                  return (
                    <Link to={e.path}>
                      <button
                        className={`jobButton ${
                          location.pathname.includes(e.path.substring(1))
                            ? "selected"
                            : ""
                        }`}
                      >
                        <h5
                          style={{
                            color:
                              location.pathname === "/" && !colorchange
                                ? "#fff"
                                : "#000000",
                          }}
                        >
                          {e.name}
                        </h5>
                      </button>
                    </Link>
                  );
                })}
              </>
            ) : null
          ) : null}

          {!isMobile ? (
            <>
              {commonRoutes.map((e) => {
                if (e.path === "/jobs") {
                  return (
                    <NavbarMegamenu
                      colorchange={location.pathname === "/" && !colorchange}
                      name={"Find Jobs"}
                    />
                  );
                }

                if (e.path === "/foremployers") {
                  return (
                    <NavbarBtnHover
                      colorchange={location.pathname === "/" && !colorchange}
                      name={"For Employers"}
                      options={[
                        {
                          name: "KYC & AML",
                          link: "https://swiftidentity.com/",
                        },
                        {
                          name: "Background Check",
                          link: "https://morrisonrecordsbureau.com/",
                        },
                        { name: "Knowledgebase", link: "/knowledgebase" },
                        { name: "Plans", link: "/plans" },
                      ]}
                    />
                  );
                }

                return (
                  <Link to={e.path}>
                    <button
                      className={`jobButton ${
                        location.pathname.includes(e.path.substring(1))
                          ? "selected"
                          : ""
                      }`}
                    >
                      <h5
                        style={{
                          color:
                            location.pathname === "/" && !colorchange
                              ? "#fff"
                              : "#000000",
                        }}
                      >
                        {e.name}
                      </h5>
                    </button>
                  </Link>
                );
              })}

              <div className="bar" />
            </>
          ) : null}
        </div>

        <div className="navbarContent">
          {token ? (
            <>
              <div className="navbatBtnContainer">
                <Link to="/profile">
                  <button
                    className={`navbarBtn ${
                      location.pathname.includes("profile") ? "selected" : ""
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ fontSize: 14, margin: 6 }}
                    />
                  </button>
                </Link>
              </div>
            </>
          ) : !isMobile ? (
            <>
              <ActionButton
                text={"Sign In"}
                handleClick={() => {
                  setMenu(false);
                  navigate("/signin");
                }}
                type="outline"
              />
              <ActionButton
                text={"Register"}
                handleClick={() => {
                  setMenu(false);
                  navigate("/register");
                }}
              />
            </>
          ) : null}

          {/* HamburgerMenu */}
          {isMobile ? (
            <>
              <button
                className={`hamburgerMenu ${
                  location.pathname === "/" && !colorchange
                    ? ""
                    : "hamburgerMenuDark"
                }`}
                onClick={() => {
                  setMenu(!menu);
                }}
              >
                <FontAwesomeIcon icon={menu ? faXmark : faBars} />
              </button>
            </>
          ) : null}
        </div>
      </div>

      {menu ? (
        <div className="menuModal shadow">
          <div className="menuModalContent">
            <div className="closeBtnContainer">
              <button
                className="closeBtn"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {!token ? (
              <div
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 15,
                  gap: 10,
                }}
              >
                <ActionButton
                  text={"Sign In"}
                  handleClick={() => {
                    setMenu(false);
                    navigate("/signin");
                  }}
                  type="outline"
                />
                <ActionButton
                  text={"Register"}
                  handleClick={() => {
                    setMenu(false);
                    navigate("/register");
                  }}
                />
              </div>
            ) : null}

            {token && type === "EMPLOYEE" ? (
              <>
                {employeeRoutes.map((e) => {
                  return (
                    <NavbarBtnMobile
                      name={e.name}
                      route={e.path}
                      closeMenu={() => {
                        setMenu(false);
                      }}
                    />
                  );
                })}
              </>
            ) : token && type === "EMPLOYER" ? (
              <>
                {employerRoutes.map((e) => {
                  return (
                    <NavbarBtnMobile
                      name={e.name}
                      route={e.path}
                      closeMenu={() => {
                        setMenu(false);
                      }}
                    />
                  );
                })}
              </>
            ) : null}

            {commonRoutes.map((e) => {
              if (e.path === "/jobs")
                return (
                  <NavbarBtnMobileMega
                    closeMenu={() => {
                      setMenu(false);
                    }}
                  />
                );
              if (e.path === "/foremployers") {
                return (
                  <NavbarBtnMobileHover
                    closeMenu={() => {
                      setMenu(false);
                    }}
                    options={[
                      {
                        name: "KYC & AML",
                        link: "https://swiftidentity.com/",
                      },
                      {
                        name: "Background Check",
                        link: "https://morrisonrecordsbureau.com/",
                      },
                      { name: "Knowledgebase", link: "/knowledgebase" },
                      { name: "Plans", link: "/plans" },
                    ]}
                  />
                );
              }

              return (
                <NavbarBtnMobile
                  name={e.name}
                  route={e.path}
                  closeMenu={() => {
                    setMenu(false);
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
