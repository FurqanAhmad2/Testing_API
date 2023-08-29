import { Link } from "react-router-dom";
import JobImage from "../../../img/company_logo_1.png";

const JobCard2 = ({ data }) => {
  return (
    <div class="job-verticle-list">
      <div class="vertical-job-card">
        <div class="vertical-job-header">
          <div class="vrt-job-cmp-logo">
            <a href="job-detail.html">
              <img src={JobImage} class="img-responsive" alt="" />
            </a>
          </div>
          <div>
            <h4>{data.company.name}</h4>
            <p>{data.title}</p>
          </div>
        </div>
        <div class="vertical-job-body">
          <div class="row">
            <div class="col-md-9 col-sm-12 col-xs-12">
              <ul class="can-skils">
                <li>
                  <strong>Job Type: </strong>
                  {data.job_type}
                </li>

                <li>
                  <strong>Vacancy: </strong>
                  {data.vacancy}
                </li>

                <li>
                  <strong>Location: </strong>
                  {data.country}
                </li>
              </ul>
            </div>
            <div class="col-md-3 col-sm-12 col-xs-12">
              <div class="vrt-job-act">
                <Link
                  to={`/job/${data.id}`}
                  class="btn-job theme-btn job-apply"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard2;
