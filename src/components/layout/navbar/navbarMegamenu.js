import {
  faAngleDown,
  faAngleUp,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, getHealthCategories } from "../../../apicalls";

const NavbarMegamenu = ({ colorchange, name }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const allCategories =
    JSON.parse(localStorage.getItem("ATS_JobCategories")) || [];

  const healthallCategories =
    JSON.parse(localStorage.getItem("ATS_HealthJobCategories")) || [];

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
            className="megamenu shadow"
            onMouseOver={() => {
              setOpen(true);
            }}
            onMouseLeave={() => {
              setOpen(false);
            }}
          >
            <div className="megamenuSection">
              <div
                onClick={() => {
                  navigate(`/jobs`);
                  setOpen(false);
                }}
              >
                <h4>Search Jobs</h4>
              </div>

              <div className="itemContainer">
                <button
                  className="megamenuItem"
                  onClick={() => {
                    navigate(
                      `/jobs?country=${
                        JSON.parse(
                          localStorage.getItem("User_ATS_Country")
                        )?.toLowerCase() || null
                      }`
                    );
                    setOpen(false);
                  }}
                >
                  <FontAwesomeIcon icon={faCircle} />
                  <p>Local Jobs</p>
                </button>
                <button
                  className="megamenuItem"
                  onClick={() => {
                    navigate(`/jobs?country=exclude`);
                    setOpen(false);
                  }}
                >
                  <FontAwesomeIcon icon={faCircle} />
                  <p>International Jobs</p>
                </button>
                {allCategories?.splice(0, 3)?.map((e) => {
                  return (
                    <button
                      className="megamenuItem"
                      onClick={() => {
                        navigate(`/jobs?category=${e.id}`);
                        setOpen(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faCircle} />
                      <p>{e.name}</p>
                    </button>
                  );
                })}
                <button
                  className="megamenuItem"
                  onClick={() => {
                    navigate(`/company`);
                    setOpen(false);
                  }}
                >
                  <FontAwesomeIcon icon={faCircle} />
                  <p>Organizations</p>
                </button>
                <button
                  className="megamenuItem"
                  onClick={() => {
                    navigate("/faq");
                    setOpen(false);
                  }}
                >
                  <FontAwesomeIcon icon={faCircle} />
                  <p>FAQ</p>
                </button>
              </div>
            </div>

            <div className="barContainer">
              <div className="bar" />
            </div>

            <div className="megamenuSection">
              <a
                href={`${process.env.REACT_APP_HEALTH_URL}/jobs`}
                target="_blank"
              >
                <h4>Find Healthcare Jobs</h4>
              </a>

              <div className="itemContainer">
                {healthallCategories?.splice(0, 3)?.map((e) => {
                  return (
                    <a
                      className="megamenuItem"
                      href={`${process.env.REACT_APP_HEALTH_URL}/jobs?category=${e.id}`}
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faCircle} />
                      <p>{e.name}</p>
                    </a>
                  );
                })}
                <button
                  className="megamenuItem"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <FontAwesomeIcon icon={faCircle} />
                  <p>Compliance and Licensure</p>
                </button>
                <button
                  className="megamenuItem"
                  onClick={() => {
                    navigate("/faq");
                    setOpen(false);
                  }}
                >
                  <FontAwesomeIcon icon={faCircle} />
                  <p>FAQ</p>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </button>
    </div>
  );
};

export default NavbarMegamenu;
