import { faComment, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const KnowledgeBase = () => {
  return (
    <>
      <div className="kbPageContainer">
        <div className="kbPageContent">
          <div className="btnContainer">
            <Link to="/apidocs?api=home">
              <div className="btn shadow">
                <FontAwesomeIcon icon={faWrench} />
                <p>Documentation</p>
              </div>
            </Link>

            <Link to="/faq">
              <div className="btn shadow">
                <FontAwesomeIcon icon={faComment} />
                <p>FAQs</p>
              </div>
            </Link>

            <Link to="/faq">
              <div className="btn shadow">
                <FontAwesomeIcon icon={faComment} />
                <p>Anohter One</p>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default KnowledgeBase;
