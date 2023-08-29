import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMessage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-sm-4">
            <div class="">
              <div className="mainContent">
                <div>
                  <h4>Collar Hire</h4>
                  <div className="iconRow">
                    <FontAwesomeIcon icon={faEnvelope} className="color1" />
                    <p className="color2">help@collarhire.com</p>
                  </div>
                </div>

                <div style={{ maxWidth: 250 }}>
                  <h4>Not a Customer yet? Contact Sales.</h4>
                  <a
                    href={`https://wa.me/${"233506608337"}`}
                    target="_blank"
                    className="iconRow"
                  >
                    <FontAwesomeIcon icon={faPhone} className="color1" />
                    <p className="color2">+233 50 660 8337</p>
                  </a>
                </div>

                <div>
                  <h4>Looking for a job?</h4>
                  <div className="iconRow">
                    <FontAwesomeIcon icon={faEnvelope} className="color1" />
                    <p className="color2">careers@collarhire.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-9 col-sm-8">
            <div class="row">
              <div class="col-md-4 col-sm-6">
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <Link to="/jobs">
                      <i class="fa fa-angle-double-right"></i> Find Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/dei">
                      <i class="fa fa-angle-double-right"></i> DEI
                    </Link>
                  </li>
                  <li>
                    <Link to="/aboutus">
                      <i class="fa fa-angle-double-right"></i> About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <i class="fa fa-angle-double-right"></i> Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div class="col-md-4 col-sm-6">
                <h4>Resources</h4>
                <ul>
                  <li>
                    <Link to="/cookies">
                      <i class="fa fa-angle-double-right"></i> Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacypolicy">
                      <i class="fa fa-angle-double-right"></i> Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/disclaimer">
                      <i class="fa fa-angle-double-right"></i> Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link to="/termsofservice">
                      <i class="fa fa-angle-double-right"></i> Terms Of Service
                    </Link>
                  </li>
                </ul>
              </div>

              <div class="col-md-4 col-sm-6">
                <h4>Location</h4>
                <div className="mapContainer shadow">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127066.76236137387!2d-0.3232577604380643!3d5.59119126810016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sin!4v1675316014673!5m2!1sen!2sin"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    width="100%"
                    height="200px"
                    frameborder="0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bottomContainer">
          <div>
            <p>Copyright © 2023 Collar Hire</p>
          </div>

          <div className="socialContainer">
            <button className="socialBtn">
              <FontAwesomeIcon icon={faFacebook} />
            </button>
            <div className="bar" />
            <button className="socialBtn">
              <FontAwesomeIcon icon={faTwitter} />
            </button>
            <div className="bar" />
            <a
              href="https://instagram.com/morrisonrecordsbureau?igshid=Zjc2ZTc4Nzk="
              target="_blank"
            >
              <button className="socialBtn">
                <FontAwesomeIcon icon={faInstagram} />
              </button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
