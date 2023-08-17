import DeiPic from "../img/dei1.png";
import DeiPic2 from "../img/about3.png";
import Breadcrumbs from "../components/common/Breadcrumbs/breadcrumbs";
import SubHeading1 from "../components/common/SubHeading1/subHeading1";
import ShowMoreText from "react-show-more-text";

const Card = ({ data }) => {
  return (
    <div className="cardContainer shadow">
      {/* <div className="imgContainer">
        <img src={Pic1} />
      </div> */}

      <h4>{data.title}</h4>

      <p>{data.content}</p>
    </div>
  );
};

const Dei = () => {
  const CardData1 = [
    {
      title: "Identifying underrepresented groups",
      content:
        "Collar Hire ATS Demographic analysis helps identify any underrepresented groups in their applicant pool, such as women or people of color, and take steps to address any potential barriers to their participation.",
    },
    {
      title: "Monitoring progress",
      content:
        "By tracking demographic data over time, organizations can monitor their progress towards becoming more diverse and inclusive, and make data-driven decisions to improve their DEI practices.",
    },
    {
      title: "Promoting fairness",
      content:
        "Demographic analysis can also help organizations ensure that their hiring practices are fair and equitable, by identifying any disparities in the selection process that may be related to race, gender, age, or other factors.",
    },
    {
      title: "Evaluating effectiveness",
      content:
        "Demographic analysis can provide valuable insights into the effectiveness of DEI initiatives, by showing the impact of these initiatives on the diversity of the applicant pool and the hiring outcomes.",
    },
  ];

  return (
    <>
      <div className="banner">
        <div className="bannerContent">
          <h1>DEI</h1>
        </div>
      </div>

      <div className="aboutusContainer">
        <div className="aboutusContent">
          <Breadcrumbs text="DEI" />
          <div>
            <div className="desc2 reverse">
              <div className="imgContainer">
                <img src={DeiPic} />
              </div>

              <div className="textContainer">
                <SubHeading1 text="Diversity, Equality & Inclusion" />

                <ShowMoreText
                  className="showmoreContainer"
                  lines={6}
                  anchorClass="show-more-less-clickable"
                >
                  <p>
                    We are committed to promoting diversity, equity, and
                    inclusion in all aspects of our business. From the
                    composition of our team to the way we serve our customers,
                    we believe that embracing diversity leads to better outcomes
                    and a more inclusive society.
                  </p>

                  <p>
                    We strive to create a welcoming and inclusive work
                    environment for all employees, where everyone feels valued
                    and respected. Our hiring practices are designed to attract
                    a diverse pool of applicants and promote equity in the
                    selection process. We are dedicated to continuously learning
                    and improving our DEI practices, to ensure that we are
                    creating a positive impact in our community.
                  </p>

                  <p>
                    Our ATS runs demographic analysis on the data collected
                    during the hiring process, such as data on the race, gender,
                    age, and education level of applicants. This information
                    helps our clients' organizations to understand the diversity
                    of their applicant pool and identify any potential biases in
                    their hiring processes.
                  </p>
                </ShowMoreText>
              </div>
            </div>

            <div className="desc2">
              <div className="imgContainer">
                <img src={DeiPic2} />
              </div>

              <div className="textContainer">
                <SubHeading1 text="How we do it?" />

                <ShowMoreText
                  className="showmoreContainer"
                  lines={6}
                  anchorClass="show-more-less-clickable"
                >
                  <p>
                    There are several ways in which demographic analysis can be
                    used to promote diversity, equity, and inclusion in the
                    hiring process and we have captured the most on demand in
                    our processes.
                  </p>
                </ShowMoreText>
              </div>
            </div>

            <div className="cardsContainer">
              {CardData1.map((e) => {
                return <Card data={e} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dei;
