import {
  faMinus,
  faPlus,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { getCandidateListSearch } from "../../apicalls";
import Spinner from "../../components/common/spinner";
import SubHeading1 from "../../components/common/SubHeading1/subHeading1";
import ResumeSearchCard from "../../components/common/ResumeSearchCard/resumeSearchCard";
import CountryStateCity from "../../countries+states+cities.json";
import Searchbar from "../../components/common/Searchbar/searchbar";
import Heading1 from "../../components/common/Heading1/heading1";
import { AuthContext } from "../../context/AuthContext";
import ScreenPermissionError from "../../components/common/ScreenPermissionError/screenPermissionError";

const filter = [
  {
    name: "Skill Level",
    objName: "skill_level",
    options: [
      { name: "Beginner", value: "beginner" },
      { name: "Intermediate", value: "intermediate" },
      { name: "Expert", value: "expert" },
    ],
  },
];

const CandidateSearch = () => {
  const { subscriptionDetails } = useContext(AuthContext);
  const [filterFields, setFilterFields] = useState({});
  const [locationFields, setLocationFields] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [countryIndex, setCountryIndex] = useState(null);
  const [stateIndex, setStateIndex] = useState(null);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filters, setFilters] = useState([...filter]);
  const [isExpand, setIsExpand] = useState({
    skill_level: false,
  });

  const CheckFilterPresent = (filterArray, searchTerm) => {
    if (!filterArray || !filterArray.length) return false;

    for (let i = 0; i < filterArray.length; i++) {
      if (filterArray[i].name === searchTerm) return true;
    }
    return false;
  };

  useEffect(() => {
    const func = () => {
      const timer = setTimeout(async () => {
        let str = "";
        setResult([]);
        if (searchTerm) {
          str = str + `search=${searchTerm}&`;
        }
        if (Object.keys(filterFields).length) {
          let keys = Object.keys(filterFields);
          keys.forEach((key) => {
            let str2 = "";
            filterFields[key].forEach((e) => {
              str2 = str2 + `${e.value},`;
            });
            if (str2) {
              str = str + `${key}=${str2.substring(0, str2.length - 1)}&`;
            }
          });
        }
        if (Object.keys(locationFields).length) {
          let keys = Object.keys(locationFields);
          keys.forEach((key) => {
            str = str + `${key}=${locationFields[key]}&`;
          });
        }
        str = str.substring(0, str.length - 1);

        if (str) {
          setIsLoading(true);
          setIsError(false);
          console.log(str);
          const res = await getCandidateListSearch(
            str,
            setIsLoading,
            setIsError
          );
          setResult(res);
        }
      }, 500);
      return () => clearTimeout(timer);
    };
    const triggerCall = setTimeout(() => {
      if (
        Object.keys(filterFields).length ||
        Object.keys(locationFields).length ||
        searchTerm
      )
        func();
    }, 500);
    return () => clearTimeout(triggerCall);
  }, [filterFields, locationFields, searchTerm]);

  useEffect(() => {
    if (countryIndex) {
      let obj = locationFields;
      delete obj["state"];
      delete obj["city"];
      setLocationFields({ ...obj });
      setStateIndex(null);
    }
  }, [countryIndex]);

  useEffect(() => {
    let obj = locationFields;
    delete obj["city"];
    setLocationFields({ ...obj });
  }, [stateIndex]);

  if (
    subscriptionDetails?.permissionIdList?.includes(7) ||
    subscriptionDetails?.permissionIdList?.includes(2)
  )
    return (
      <>
        <div className="dashboardHeader">
          <Heading1 text={"Search Resume"} />
        </div>

        <div className="candidateSearchContainer">
          <div className="searchContainer">
            <Searchbar
              searchterm={searchTerm}
              setSearchterm={setSearchTerm}
              placeholder={"Search..."}
              handleSubmit={() => {}}
            />
          </div>

          <div className="candidateSearchContent  flex justify-center">
           

            {isLoading ? (
              <Spinner />
            ) : !result.length ? (
              <SubHeading1 text={"No result found"} />
            ) : (
              <div className="mainContent  ">
                {result.map((e) => {
                  return <ResumeSearchCard data={e} />;
                })}
              </div>
            )}
          </div>
        </div>
      </>
    );
  else return <ScreenPermissionError />;
};

export default CandidateSearch;
