import CompanyCard from "../components/common/CompanyCard/companyCard";
import SubHeading1 from "../components/common/SubHeading1/subHeading1";
import useWindow from "../hooks/useWindow";
import Img from "../img/company.png";
import Breadcrumbs from "../components/common/Breadcrumbs/breadcrumbs";

const Company = () => {
  const { width } = useWindow();
  const data = [
    {
      name: "TCS",
      imageUrl:
        "https://uploads-ssl.webflow.com/627cdcca8bc0d25e49b26705/62af292b7324d91ad7986aff_hays.png",
    },
    {
      name: "Wells Fargo",
      imageUrl:
        "https://uploads-ssl.webflow.com/627cdcca8bc0d25e49b26705/62af292bd831077dc8db8083_kelly-services.png",
    },
    {
      name: "RBS",
      imageUrl:
        "https://uploads-ssl.webflow.com/627cdcca8bc0d25e49b26705/62af292be7e7cfb102587f8b_deloitte.png",
    },
    {
      name: "Shopper Stop Ltd",
      imageUrl:
        "https://uploads-ssl.webflow.com/627cdcca8bc0d25e49b26705/62af292a91fe2ca6cf9372ee_adecco.png",
    },
    {
      name: "Muthoot Finance",
      imageUrl:
        "https://uploads-ssl.webflow.com/627cdcca8bc0d25e49b26705/62af292cb8643c09ae5a646b_toyota.png",
    },
    {
      name: "Apollo Pharmacy",
      imageUrl:
        "https://uploads-ssl.webflow.com/627cdcca8bc0d25e49b26705/63621a456780d47b0695ae5a_KPMG-logo.png",
    },
    {
      name: "Nokia",
      imageUrl:
        "https://uploads-ssl.webflow.com/627cdcca8bc0d25e49b26705/62af292bd831074734db8084_michael-page.png",
    },
    {
      name: "Erricson",
      imageUrl:
        "https://uploads-ssl.webflow.com/627cdcca8bc0d25e49b26705/62af2cf482ada21769a00414_axiata.png",
    },
  ];

  return (
    <>
      <div className="banner">
        <div className="bannerContent">
          <h1>Partners & Integration</h1>
        </div>
      </div>

      <div className="companyPageContainer">
        <div className="companiesPageContent">
          <Breadcrumbs text="Partners & Integration" />
          <div className="content1">
            <div className="textContainer">
              <SubHeading1 text={"Get Hired Into Top Companies!"} />
              <p>
                Get your dream job in top MNCs accross the globe. Quick and
                efficient interview and onbording.
              </p>
            </div>

            <div className="imgContainer">
              <img src={Img} />
            </div>
          </div>

          <div className="companiesCardContainer">
            <div className="subContainer">
              <CompanyCard data={data[0]} />
              <div className="horiontalBar" />
              <CompanyCard data={data[1]} />
            </div>

            <div className="bar" />

            <div className="subContainer">
              <CompanyCard data={data[2]} />
              <div className="horiontalBar" />
              <CompanyCard data={data[3]} />
            </div>

            {width > 750 ? (
              <div className="bar" />
            ) : (
              <div className="horiontalBar spanentire" />
            )}

            <div className="subContainer">
              <CompanyCard data={data[4]} />
              <div className="horiontalBar" />
              <CompanyCard data={data[5]} />
            </div>

            <div className="bar" />

            <div className="subContainer">
              <CompanyCard data={data[6]} />
              <div className="horiontalBar" />
              <CompanyCard data={data[7]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;
