import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBorderAll,
  faCircleCheck,
  faCircleXmark,
  faChalkboardUser,
  faBuilding,
  faBriefcase,
  faFile,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = (props) => {
  const location = useLocation();
  const { type } = useContext(AuthContext);
  const [tabbtn, setTabBtn] = useState(0);

  useEffect(() => {
    let path = location.pathname.substring(10);
    if (type === "EMPLOYER") {
      if (path === "/postedjob") setTabBtn(1);
      else if (path === "/employerinterview") setTabBtn(2);
      else if (path === "/jobonboarding") setTabBtn(3);
      else if (path === "/candidatesearch") setTabBtn(4);
      else setTabBtn(0);
    } else {
      if (path === "/interview") setTabBtn(1);
      else if (path === "/onboarding") setTabBtn(2);
      else if (path === "/jobsrejected") setTabBtn(3);
      else setTabBtn(0);
    }
  }, [location.pathname]);

  const employeeTabs = [
    { name: "Jobs Applied", path: "/dashboard" },
    { name: "Interview", path: "/dashboard/interview" },
    { name: "Onboarding", path: "/dashboard/onboarding" },
    { name: "Jobs Rejected", path: "/dashboard/jobsrejected" },
  ];

  const employerTabs = [
    { name: "Entities", path: "/dashboard" },
    { name: "Posted Jobs", path: "/dashboard/postedjob" },
    { name: "Interview", path: "/dashboard/employerinterview" },
    { name: "Onboarding ", path: "/dashboard/jobonboarding" },
    { name: "Search Resume ", path: "/dashboard/candidatesearch" },
  ];

  return (
    <div className="dashboardContainer">
      <div className="navBar">
        <div className="navButtons">
          {type === "EMPLOYEE"
            ? employeeTabs.map((e, index) => {
                return (
                  <Link to={e.path}>
                    <button
                      className={index === tabbtn ? "selected" : null}
                      onClick={() => {
                        setTabBtn(index);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          index === 0
                            ? faBorderAll
                            : index === 1
                            ? faChalkboardUser
                            : index === 2
                            ? faCircleCheck
                            : faCircleXmark
                        }
                      />
                      <p>{e.name}</p>
                    </button>
                  </Link>
                );
              })
            : employerTabs.map((e, index) => {
                return (
                  <Link to={e.path}>
                    <button
                      className={index === tabbtn ? "selected" : null}
                      onClick={() => {
                        setTabBtn(index);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          index === 0
                            ? faBuilding
                            : index === 1
                            ? faBriefcase
                            : index === 2
                            ? faChalkboardUser
                            : index === 3
                            ? faFile
                            : faMagnifyingGlass
                        }
                      />
                      <p>{e.name}</p>
                    </button>
                  </Link>
                );
              })}
        </div>
      </div>

      <div className="dashboardContent">
        {props.children ? props.children : <Outlet />}
      </div>
    </div>
  );
};

export default DashboardLayout;
