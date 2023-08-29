import AboutPic from "../img/about1.png";
import Mission from "../img/about2.png";
import Vision from "../img/about3.png";
import Security from "../img/about4.png";
import Infra from "../img/about5.png";
import Practices from "../img/about6.png";
import ShowMoreText from "react-show-more-text";
import Breadcrumbs from "../components/common/Breadcrumbs/breadcrumbs";
import SubHeading1 from "../components/common/SubHeading1/subHeading1";

const Card = ({ data }) => {
  return (
    <div className="cardContainer shadow">
      <h4>{data.title}</h4>
      <p>{data.content}</p>
    </div>
  );
};

const Aboutus = () => {
  const CardData1 = [
    {
      title: "Encryption",
      content:
        "All data stored in our ATS is encrypted both in transit and at rest, using industry-standard protocols such as SSL and AES.",
    },
    {
      title: "Access Controls",
      content:
        "Access to sensitive data is restricted to authorized personnel only, and all access is logged and auditable.",
    },
    {
      title: "Regular Security Audits",
      content:
        "We conduct regular security audits and vulnerability assessments to identify and address potential security risks.",
    },
    {
      title: "Compliance Certifications",
      content:
        "Our ATS is compliant with relevant regulations such as HIPAA and SOC 2.",
    },
    {
      title: "Data Backup and Disaster Recovery",
      content:
        "We maintain regular backups of all data to ensure quick recovery in the event of a disaster.",
    },

    {
      title: "Data Backup and Disaster Recovery",
      content:
        "We maintain regular backups of all data to ensure quick recovery in the event of a disaster.",
    },
  ];

  const CardData2 = [
    {
      title: "Regular Software Updates",
      content:
        "We regularly update our ATS with the latest security patches and features to ensure that all vulnerabilities are addressed in a timely manner.",
    },
    {
      title: "Employee Training",
      content:
        "All employees are trained on security best practices and policies, including how to handle sensitive data and how to recognize and report potential security threats.",
    },
    {
      title: "Network Security",
      content:
        "Our ATS is protected by a firewall and other security measures to prevent unauthorized access from the Internet.",
    },
    {
      title: "Physical Security",
      content:
        "All data center and server facilities are secured with 24/7 monitoring, surveillance, and access controls.",
    },
    {
      title: "Incident Response",
      content:
        "We have an incident response plan in place to quickly and effectively respond to and mitigate any security incidents.",
    },

    {
      title: "Regular Penetration Testing",
      content:
        "We conduct regular penetration testing to identify and address any vulnerabilities in our ATS.",
    },
    {
      title: "Third-party Security",
      content:
        "We thoroughly vet and monitor all third-party vendors and service providers to ensure that their security measures meet our standards.",
    },
  ];

  const CardData3 = [
    {
      title: "Multi-Factor Authentication",
      content:
        "We use multi-factor authentication for all user access to our ATS, to ensure that only authorized personnel can access sensitive data.",
    },
    {
      title: "Network Segmentation",
      content:
        "We segment our network to limit access to sensitive data, and use firewalls and other security measures to prevent unauthorized access.",
    },
    {
      title: "Data Encryption",
      content:
        "All data stored in our ATS is encrypted both in transit and at rest, using industry-standard protocols such as SSL and AES.",
    },
    {
      title: "Virtual Private Cloud (VPC) ",
      content:
        "We use VPC to isolate our ATS infrastructure and limit access to only authorized personnel.",
    },
    {
      title: "Regular Security Audits",
      content:
        "We conduct regular security audits and vulnerability assessments to identify and address potential security risks.",
    },

    {
      title: "Compliance Certifications",
      content:
        "Our ATS is compliant with relevant regulations such as SOC 2, HIPAA and PCI DSS.",
    },
    {
      title: "Data Backup and disaster recovery",
      content:
        "We maintain regular backups of all data to ensure quick recovery in the event of a disaster.",
    },
  ];

  return (
    <>
      <div className="banner">
        <div className="bannerContent">
          <h1>About Us</h1>
        </div>
      </div>

      <div className="aboutusContainer">
        <div className="aboutusContent">
          <Breadcrumbs text="About Us" />
          <div>
            <div className="desc2 reverse">
              <div className="imgContainer">
                <img src={AboutPic} />
              </div>

              <div className="textContainer">
                <SubHeading1 text="About Collar Hire ATS" />

                <ShowMoreText
                  className="showmoreContainer"
                  lines={6}
                  anchorClass="show-more-less-clickable"
                >
                  <p>
                    Our Applicant Tracking System (ATS) is a cutting-edge
                    recruitment solution that streamlines the hiring process for
                    employers. Our system allows companies to efficiently manage
                    job listings, resumes, and Applicants, making it easy to
                    identify the best candidates for open positions.
                  </p>

                  <p>
                    <br />
                    Our ATS is designed to be user-friendly and intuitive,
                    allowing hiring managers and recruiters to quickly navigate
                    through resumes and Applicants. The system automatically
                    screens resumes for keywords and qualifications and assigns
                    scores to candidates based on their match to the job
                    listing. This helps employers to quickly identify the most
                    qualified candidates for a position.
                  </p>

                  <p>
                    <br />
                    Our system also includes a variety of tools to help with
                    scheduling interviews, communicating with candidates, and
                    tracking the status of job Applicants. This allows
                    employers to stay organized and on top of the recruitment
                    the process at all times.
                  </p>

                  <p>
                    <br />
                    We understand that every company is unique and has different
                    needs, that's why we provide a fully customized ATS to fit
                    your company's specific requirements. Our team is dedicated
                    to provide the highest level of customer service and
                    support, ensuring that our clients get the most out of our
                    system.
                  </p>

                  <p>
                    Choose our ATS to make your recruitment process efficient,
                    save time and find the best candidates for your open
                    positions in no time.
                  </p>
                </ShowMoreText>
              </div>
            </div>

            <div className="desc2">
              <div className="imgContainer">
                <img src={Mission} />
              </div>

              <div className="textContainer">
                <SubHeading1 text="Mission" />

                <ShowMoreText
                  className="showmoreContainer"
                  lines={6}
                  anchorClass="show-more-less-clickable"
                >
                  <p>
                    "CollarHire is dedicated to revolutionizing the recruitment process
                    by considering the needs of employers and job seekers. 
                    Our mission is to provide a cutting-edge Applicant Tracking System (ATS)
                    that sets a new standard of excellence. With a strong vision, we aim to 
                    facilitate exceptional talent acquisition for employers and empower job
                    seekers to find their ideal career."
                  </p>
                </ShowMoreText>
              </div>
            </div>

            <div className="desc2 reverse">
              <div className="imgContainer">
                <img src={Vision} />
              </div>

              <div className="textContainer">
                <SubHeading1 text="Vision" />

                <ShowMoreText
                  className="showmoreContainer"
                  lines={6}
                  anchorClass="show-more-less-clickable"
                >
                  <p>
                    "Our vision at CollarHire is to be the leading provider of Applicant 
                     Tracking Systems in Ghana and West Africa. We aim to empower companies
                     of all sizes to effectively manage their recruitment process and connect
                     with top talent. By creating an intuitive, efficient, and data-driven
                     platform, we strive to help companies identify, attract, and retain 
                     high-performing employees. Through continuous innovation, we seek 
                     to make the job search and hiring process more efficient, transparent, 
                     and fair for both employers and job seekers.
                     Our ultimate goal is to make a positive impact on the world of work
                     and shape the future of human resources."
                
                  </p>
                </ShowMoreText>
              </div>
            </div>

            <div className="desc2">
              <div className="imgContainer">
                <img src={Security} />
              </div>

              <div className="textContainer">
                <SubHeading1 text="Security & Compliance" />

                <p>
                  "Data security and compliance are top priorities at CollarHire.
                   Our Applicant Tracking System (ATS) is meticulously designed 
                   to meet industry-standard security protocols and regulations, 
                   ensuring the protection of sensitive and confidential information.
                   We are committed to maintaining the highest levels of data security
                   to provide our clients with peace of mind."
                </p>

                <p style={{ paddingTop: 20 }}>
                  To ensure compliance, we have implemented the following
                  security measures:
                </p>
              </div>
            </div>

            <div className="cardsContainer">
              {CardData1.map((e) => {
                return <Card data={e} />;
              })}
            </div>

            <div className="desc2 reverse">
              <div className="imgContainer">
                <img src={Practices} />
              </div>

              <div className="textContainer">
                <SubHeading1 text="Best Practices" />

                <p>
                  "At Collarhire, we are committed to maintaining the highest
                  level of security for our Applicant Tracking System (ATS)
                  and the data that it handles.
                </p>

                <p style={{ paddingTop: 20 }}>
                  To ensure the safety and security of our client's data, we
                  adhere to the following best practices:
                </p>
              </div>
            </div>

            <div className="cardsContainer">
              {CardData2.map((e) => {
                return <Card data={e} />;
              })}
            </div>

            <div className="desc2">
              <div className="imgContainer">
                <img src={Infra} />
              </div>

              <div className="textContainer">
                <SubHeading1 text="Infrastructure" />

                <p>
                  CollarHire recognizes the supreme importance of security in relation
                  to our Applicant Tracking System (ATS) and the data it manages. 
                  To ensure the highest level of security, we have opted to deploy our 
                  ATS infrastructure in the cloud, adhering to industry best practices 
                  for data protection and security measures. By leveraging cloud technology, 
                  we can effectively safeguard the confidentiality and integrity of the data
                  entrusted to us.
                </p>

                <p style={{ paddingTop: 20 }}>
                  Our cloud-based infrastructure includes the following security
                  measures:
                </p>
              </div>
            </div>

            <div className="cardsContainer">
              {CardData3.map((e) => {
                return <Card data={e} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
