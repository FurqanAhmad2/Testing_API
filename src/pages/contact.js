import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCheckCircle, faMessage } from "@fortawesome/free-regular-svg-icons";
import {
  faBriefcase,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Heading1 from "../components/common/Heading1/heading1";
import ContactImg1 from "../img/contactImg1.png";
import Breadcrumbs from "../components/common/Breadcrumbs/breadcrumbs";
import SubHeading1 from "../components/common/SubHeading1/subHeading1";

const Contact = () => {
  return (
    <>
      <div className="banner">
        <div className="bannerContent">
          <h1>Contact Us</h1>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 15px" }}>
        <Breadcrumbs text="Contact Us" />
      </div>
      <div className="contactContainer">
        <div className="contactContent">
          <div className="header">
            <div className="textContainer">
              <SubHeading1 text="Your Personal Demo" />
              <p className="mainText">
                Get to know Collar Hire! Our product experts will guide you
                through our solution:
              </p>
              <div>
                <div className="list">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>Introduction to all product features</p>
                </div>
                <div className="list">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>Important features for your business priorities</p>
                </div>
                <div className="list">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <p>Answers to any questions you may have</p>
                </div>
              </div>
            </div>

            <div className="imageContainer">
              <img src={ContactImg1} />
            </div>
          </div>

          <div className="mainContent">
            <div className="contentSubHeading">
              <SubHeading1 text="Book Your Free Demo" />
              <p>
                We will only contact you to book an appoint that works for you
                and understand your specific requirements.
              </p>
            </div>

            <div className="mainSection">
              <form
                class="contactform"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="grid">
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div>
                  <label>Subject</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label>Message</label>
                  <textarea
                    class="form-control height-120"
                    placeholder="Message"
                  ></textarea>
                </div>
                <button
                  class="btn theme-btn"
                  name="submit"
                  style={{ borderRadius: 30, fontSize: 12 }}
                >
                  Send Message
                </button>
              </form>

              <div className="socialsContainer">
                <div className="contactRowContainer">
                  <div className="contactRow">
                    <div className="btnContainer">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>

                    <div>
                      <p className="primary">Email</p>
                      <p className="secondary">help@collarhire.com</p>
                    </div>
                  </div>

                  <div className="contactRow">
                    <div className="btnContainer">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>

                    <div>
                      <p className="primary">Phone</p>
                      <p className="secondary">+233 50 660 8337</p>
                    </div>
                  </div>

                  <div className="contactRow">
                    <div className="btnContainer ">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </div>

                    <div>
                      <p className="primary">Looking for a job?</p>
                      <p className="secondary">careers@collarhire.com</p>
                    </div>
                  </div>
                </div>

                <Heading1 text="Connect Us On" />
                <div className="socialBtnContainer">
                  <div className="btnContainer">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </div>

                  <div className="btnContainer">
                    <FontAwesomeIcon icon={faFacebook} />
                  </div>

                  <a
                    href="https://instagram.com/morrisonrecordsbureau?igshid=Zjc2ZTc4Nzk="
                    target="_blank"
                    className="btnContainer"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>

                  <div className="btnContainer">
                    <FontAwesomeIcon icon={faTwitter} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
