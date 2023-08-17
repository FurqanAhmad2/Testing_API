import { useQuery } from "@tanstack/react-query";
import {
  getAllDeiData,
  getCompanies,
  getEmployers,
  getJobPosts,
} from "../../apicalls";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBuilding,
  faPeopleGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Card1 from "../../components/common/EmployerOverviewComponents/card1";
import Card2 from "../../components/common/EmployerOverviewComponents/card2";
import DonutChartContent from "../../components/common/DonutChart/donutChart";
import { format } from "date-fns";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";
import ScreenError from "../../components/common/ScreenError/screenError";

const OverviewEmployer = () => {
  const { token } = useContext(AuthContext);
  const [statsData, setStatsData] = useState({
    genderData: [
      { name: "MALE", value: 0 },
      { name: "FEMALE", value: 0 },
      { name: "OTHER", value: 0 },
    ],
    applicationStatus: [
      { name: "QUALIFIED", value: 0 },
      { name: "ACCEPTED", value: 0 },
      { name: "REJECTED", value: 0 },
    ],
    topCountries: [],
    topAgeRange: [],
    topSkills: [],
  });

  const {
    isError: alldeiError,
    isLoading: alldeiLoading,
    data: alldeiData,
  } = useQuery({
    queryKey: [`AllDeiStats`, token],
    queryFn: getAllDeiData,
  });

  const {
    isError: jobsError,
    isLoading: jobsLoading,
    data: jobs,
  } = useQuery({
    queryKey: [`AllJobsPosted`, token],
    queryFn: getJobPosts,
  });

  const {
    isError: companiesError,
    isLoading: companiesLoading,
    data: companies,
  } = useQuery({
    queryKey: [`AllCompanies`, token],
    queryFn: getCompanies,
  });

  const {
    isError: employersError,
    isLoading: employersLoading,
    data: employers,
  } = useQuery({
    queryKey: [`Employers`, token],
    queryFn: getEmployers,
  });

  console.log(alldeiData);
  console.log(statsData);

  const frequencyCount = (arr) => {
    const counts = {};
    for (const num of arr) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    let temp = [];
    for (const [key, value] of Object.entries(counts)) {
      temp.push({ name: key, value: value });
    }

    temp.sort((a, b) => b.value - a.value);
    return temp.splice(0, 5);
  };

  useEffect(() => {
    if (alldeiData?.length) {
      let genderData = [];
      let applicationStatus = [];
      let topCountries = [];
      let topAgeRange = [];
      let topSkills = [];

      for (let i = 0; i < alldeiData.length; i++) {
        genderData.push(alldeiData[i].employee.gender);
        if (alldeiData[i]?.status) applicationStatus.push(alldeiData[i].status);
        if (alldeiData[i]?.employee.country)
          topCountries.push(alldeiData[i].employee.country.toLowerCase());
        if (alldeiData[i]?.employee?.date_of_birth)
          topAgeRange.push(alldeiData[i].employee.date_of_birth);
        if (alldeiData[i]?.job?.skills)
          topSkills = [
            ...topSkills,
            ...alldeiData[i].job?.skills
              .trim()
              .toLowerCase()
              .split(/\s*,\s*/),
          ];
      }

      setStatsData({
        ...statsData,
        genderData: frequencyCount(genderData),
        applicationStatus: frequencyCount(applicationStatus),
        topCountries: frequencyCount(topCountries),
        topAgeRange: frequencyCount(topAgeRange),
        topSkills: frequencyCount(topSkills),
      });
    }
  }, [alldeiData]);

  if (alldeiLoading || jobsLoading || companiesLoading || employersLoading)
    return <ScreenLoading />;
  if (alldeiError || jobsError || companiesError || employersError)
    return <ScreenError />;

  return (
    <>
      <div className="profileBanner">
        <div className="bannerContent">
          <h1>Overview</h1>
        </div>
      </div>

      <div
        className="profileMainContainer"
        style={{ backgroundColor: "transparent", padding: 0 }}
      >
        <div className="employerOverviewContainer">
          <div className="card1Container">
            <Card1
              value={alldeiData?.length || 0}
              label="Candidates"
              icon={faPeopleGroup}
            />
            <Card1
              value={employers?.length || 0}
              label="Members"
              icon={faUser}
            />
            <Card1 value={jobs?.length || 0} label="Jobs" icon={faBriefcase} />
            <Card1
              value={companies?.length || 0}
              label="Companies"
              icon={faBuilding}
            />
          </div>

          <div className="profileBanner">
            <div className="bannerContent">
              <h1>Applicants</h1>
            </div>
          </div>

          <div className="card2Container">
            <DonutChartContent
              title="Application Status"
              subheading="Chart showing application status distribution."
              data={statsData.applicationStatus}
            />
            <DonutChartContent
              title="Gender"
              subheading="Chart showing gender distribution"
              data={statsData.genderData}
            />

            <Card2
              title="Countries"
              subheading="Top Countries the candidates are from."
              data={statsData.topCountries}
            />
            <Card2
              title="Skills"
              subheading="Top Skills required in posted jobs."
              data={statsData.topSkills}
            />
            {/* <Card2
              title="Age"
              subheading="Top Age Ranges in candidates."
              data={statsData.topAgeRange}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewEmployer;
