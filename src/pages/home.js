import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, getJobList } from "../apicalls";
import ActionButton from "../components/common/ActionButton/actionButton";
import CategoryCard from "../components/common/CategoriesCard/categoryCard";
import JobCard1 from "../components/common/JobCard1/jobCard1";
import Spinner from "../components/common/spinner";
import SubHeading1 from "../components/common/SubHeading1/subHeading1";
import TextContent1 from "../components/common/TextContent1/textContent1";
import { AuthContext } from "../context/AuthContext";
import CountryStateCity from "../countries+states+cities.json";
import useWindow from "../hooks/useWindow";
import HomeImg1 from "../img/homeImg1.png";
import HomeImg2 from "../img/homeImg2.png";
import HomeImg3 from "../img/homeImg3.png";
import HomeImg4 from "../img/homeImg4.png";
import Footer from "../components/layout/footer/footer";

const Home = () => {
  const navigate = useNavigate();
  const { width } = useWindow();

  const { token, type } = useContext(AuthContext);
  const [searchBarContent, setSearchBarContent] = useState({
    searchTerm: "",
    location: "",
    category: "",
  });
  console.log(searchBarContent);
  const {
    isError: jobsError,
    isLoading: jobsLoading,
    data: alljobs,
  } = useQuery({
    queryKey: [`AllJobs`],
    queryFn: getJobList,
  });

  const {
    isError: categoriesError,
    isLoading: categoriesLoading,
    data: allCategories,
  } = useQuery({
    queryKey: [`AllCategories`],
    queryFn: getCategories,
  });

  const TextContent = [
    {
      title: "Onboarding",
      text: "Seamlessly align your application process: With automated onboarding tasks, everyone knows what to do - so new hires hit the ground running.",
    },
    {
      title: "Candidates' Profiles Enrichment",
      text: "Collect insights beyond resume. Collar Hire AI Engine browses the web in search of data on all social media and public platforms to automatically enrich candidates' profiles. Data enrichment done seamlessly during the candidate creation. 10+ social and public platforms, including LinkedIn, Facebook, Twitter, GitHub, Medium and many more.",
    },
    {
      title:
        "Recruiting is just the start - Add automation to the rest of your HR",
      text: "Unlock your company's productive potential by turning manual processes into automated workflows. Connect tools, align stakeholders, and accelerate business like never before with People Workflow Automation.",
    },
    {
      title: "Electronic Signature",
      text: "Lightning-fast processes without wasted paper: With e-signatures, candidates can sign offers easily, and directly, online.",
    },
  ];

  return (
    <div className="homeContainer">
      <div className="heroContainer">
        <div className="heroSection">
          <div className="heroContent">
            <div className="heroTitle">
              <h2>
                Search Between More Than <span class="highlight">50,000 </span>
                Open Jobs.
              </h2>
            </div>

            <div className="searchbarContainer">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(
                    `/jobs?country=${searchBarContent.location.toLowerCase()}&category=${
                      searchBarContent.category
                    }&search=${searchBarContent.searchTerm}`
                  );
                }}
                className="searchbar"
              >
                <input
                  className="searchInput input1"
                  placeholder="Search keywords..."
                  type="text"
                  required
                  value={searchBarContent.searchTerm}
                  onChange={(e) =>
                    setSearchBarContent({
                      ...searchBarContent,
                      searchTerm: e.target.value,
                    })
                  }
                />

                {width > 750 ? (
                  <>
                    <div className="bar" />

                    <select
                      className="searchInput input2"
                      onChange={(e) => {
                        setSearchBarContent({
                          ...searchBarContent,
                          location: e.target.value,
                        });
                      }}
                    >
                      <option disabled selected value="">
                        Location
                      </option>

                      {CountryStateCity.map((e) => {
                        return <option value={e.value}>{e.name}</option>;
                      })}
                    </select>

                    <div className="bar" />

                    <select
                      className="searchInput input2"
                      onChange={(e) => {
                        setSearchBarContent({
                          ...searchBarContent,
                          category: e.target.value,
                        });
                      }}
                    >
                      <option disabled selected value="">
                        Category
                      </option>
                      {allCategories?.map((e) => {
                        return <option value={e.id}>{e.name}</option>;
                      })}
                    </select>
                  </>
                ) : null}

                <div>
                  <button className="submitBtnContainer" type="submit">
                    <p>SEARCH</p>
                    <div className="iconContainer">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="sections">
        <div className="sectionsContainer">
          {TextContent.map((e, index) => {
            return (
              <>
                <div className="subSection">
                  <div
                    className={`subSectionContent ${
                      index % 2 === 0 ? "oppositeDirection" : ""
                    }`}
                  >
                    <div className="imgContainer">
                      <img
                        src={
                          index === 0
                            ? HomeImg1
                            : index === 1
                            ? HomeImg2
                            : index === 2
                            ? HomeImg3
                            : HomeImg4
                        }
                      />
                    </div>

                    <div className="textContainer">
                      <div className="headingContainer">
                        <SubHeading1 text={e.title} />
                      </div>
                      <div>
                        <TextContent1 text={e.text} />
                      </div>
                    </div>
                  </div>
                  {index !== TextContent.length - 1 ? (
                    <div className="horizontalBar"></div>
                  ) : null}
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className="jobSection">
        <div className="sections">
          <div className="sectionsContainer">
            <div className="sectionHeading">
              <SubHeading1 text={"Latest Jobs"} type={"light"} />
              <TextContent1
                text={
                  "If you are interested in joining the Collar Hire team and being part of an exciting and innovative company, be sure to check out the latest job opportunities."
                }
                style={{ paddingTop: 15 }}
                type={"light"}
              />
            </div>

            {jobsLoading ? <Spinner /> : null}
            {jobsError ? (
              <h3 style={{ textAlign: "center" }}>Something went wrong</h3>
            ) : null}

            <div class="jobcardsContainer">
              {alljobs?.slice(0, 3).map((e) => {
                return <JobCard1 data={e} />;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="sections">
        <div className="sectionsContainer">
          <div className="sectionHeading">
            <SubHeading1 text={"Job Categories"} />
            <TextContent1
              text={
                "We offer a wide range of job categories in the job market, providing opportunities for professionals with different skills and backgrounds to join their team."
              }
              style={{ paddingTop: 15 }}
            />
          </div>

          {categoriesLoading ? <Spinner /> : null}
          {categoriesError ? (
            <h3 style={{ textAlign: "center" }}>Something went wrong</h3>
          ) : null}

          <div>
            <div className="categoryCardContainer">
              {allCategories?.slice(0, 8).map((e) => {
                return <CategoryCard data={e} />;
              })}
            </div>

            <div
              style={{ marginTop: 40, display: "grid", placeItems: "center" }}
            >
              <ActionButton
                text={"VIEW ALL CATEGORIES"}
                type={"filled"}
                handleClick={() => {
                  navigate(`/category`);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
