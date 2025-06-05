import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import Loader from "../components/Loader/Loader";
import {
  getDetailJobBySlug,
  getLatestSixJobs,
} from "../features/actions/career";
import { checkApplicantLogin } from "../features/actions/authentication";

const Career = () => {
  const assetRoute = `${
    import.meta.env.VITE_PRODUCTION === "true"
      ? import.meta.env.VITE_ASSETS
      : ""
  }`;

  const dispatch = useDispatch();
  const { slug } = useParams();
  const { isLoading } = useSelector((state) => state.career);
  const { data, related_jobs } = useSelector(
    (state) => state.career.detailJobData
  );
  const storedEmail = localStorage.getItem("user_email");

  const { response, userEmail, isUserLoggedIn } = useSelector(
    (state) => state.authentication
  );

  const handleApply = async (e, item) => {
    e.preventDefault();

    // First, check login
    if (userEmail) {
      dispatch(checkApplicantLogin(userEmail));
    } else {
      dispatch(checkApplicantLogin(storedEmail));
    }

    if (!isUserLoggedIn) {
      window.location.href = "https://www.lifeatbabvip.com/applicant/login";
    }

    const applicantId = response?.applicant?.id;
    if (!applicantId) return;

    const form = document.createElement("form");
    form.method = "GET";
    form.action = "https://www.lifeatbabvip.com/job/job-application-store";

    const applicantIdInput = document.createElement("input");
    applicantIdInput.type = "hidden";
    applicantIdInput.name = "applicant_id";
    applicantIdInput.value = applicantId;
    form.appendChild(applicantIdInput);

    const jobIdInput = document.createElement("input");
    jobIdInput.type = "hidden";
    jobIdInput.name = "job_id";
    jobIdInput.value = item.id;
    form.appendChild(jobIdInput);

    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    dispatch(getDetailJobBySlug(slug));
    dispatch(getLatestSixJobs());
  }, [slug]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <section
        class="page-header position-relative overflow-hidden pt-160 pb-80 bg-dark"
        style={{
          background: `url('${assetRoute}/assets/img/page-header-bg.svg')no-repeat bottom left`,
        }}
      >
        <div class="container">
          <div class="row justify-content-between align-items-center">
            <div class="col-lg-8 col-12">
              <div class="company-info-wrap">
                <div class="company-logo p-3  bg-white shadow rounded-custom me-4 mt-2">
                  <div class="logo">
                    <img
                      src={
                        data?.department?.department_image
                          ? `${
                              import.meta.env.VITE_REACT_APP_IMAGE_PATH_CUSTOM
                            }/${data?.department?.department_image}`
                          : `${assetRoute}/placeholder.webp`
                      }
                      alt="department"
                      class="img-fluid"
                    />
                  </div>
                </div>
                <div class="company-overview">
                  <h1 class="display-5 fw-bold text-capitalize">
                    {data?.title}
                  </h1>

                  <h6 className="text-capitalize">
                    Job Type : {data?.type.replace(/-/g, " ")}
                  </h6>
                  <ul class="list-unstyled list-inline mb-0 mt-3">
                    <li class="list-inline-item me-4">
                      <i class="fas fa-house me-2"></i>{" "}
                      {data?.company?.company_name}
                    </li>

                    <li class="list-inline-item me-4">
                      <i class="fas fa-location-arrow me-2"></i>
                      {data?.location?.location_name}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-12">
              <div class="annual-salary-wrap rounded-custom bg-white">
                <h6>Annual Salary</h6>
                <span
                  class="display-6  fw-semi-bold text-dark mb-0"
                  style={{ fontSize: "22px" }}
                >
                  {data?.minimum_salary && data?.maximum_salary
                    ? `₹ ${data?.minimum_salary} - ${data?.maximum_salary} LPA`
                    : !data?.minimum_salary && data?.maximum_salary
                    ? `${data?.maximum_salary} LPA`
                    : data?.minimum_salary && !data?.maximum_salary
                    ? `${data?.minimum_salary} LPA`
                    : "NA"}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-circle rounded-circle circle-shape-3 position-absolute bg-dark-light right-5"></div>
        </div>
      </section>

      <section class="job-details ptb-120">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-8 pe-lg-5">
              <div class="job-details-wrap">
                <h2>Job Details</h2>
                {parse(String(data?.description))}
              </div>
            </div>
            <div class="col-lg-4">
              <div class="job-overview-wrap bg-light-subtle p-5 sticky-sidebar rounded-custom mt-5 mt-lg-0">
                <h5>Job Overviews</h5>
                <ul class="job-overview-list list-unstyled mt-4">
                  <li>
                    <i class="far fa-user text-primary"></i>
                    <div class="overview-item">
                      <h6 class="mb-0">Job Title:</h6>
                      <span> {data?.title}</span>
                    </div>
                  </li>
                  <li>
                    <i class="fas fa-location-arrow text-primary"></i>
                    <div class="overview-item">
                      <h6 class="mb-0">Company:</h6>
                      <span> {data?.company?.company_name}</span>
                    </div>
                  </li>
                  <li>
                    <i class="far fa-clock text-primary"></i>
                    <div class="overview-item">
                      <h6 class="mb-0">Department:</h6>
                      <span> {data?.department?.Department_name}</span>
                    </div>
                  </li>
                  <li>
                    <i class="fas fa-location-arrow text-primary"></i>
                    <div class="overview-item">
                      <h6 class="mb-0">Location:</h6>
                      <span> {data?.location?.location_name}</span>
                    </div>
                  </li>

                  <li>
                    <i class="fas fa-wallet text-primary"></i>
                    <div class="overview-item">
                      <h6 class="mb-0">Salary:</h6>
                      <span>
                        {" "}
                        {data?.minimum_salary && data?.maximum_salary
                          ? `₹ ${data?.minimum_salary} - ${data?.maximum_salary} LPA`
                          : !data?.minimum_salary && data?.maximum_salary
                          ? `${data?.maximum_salary} LPA`
                          : data?.minimum_salary && !data?.maximum_salary
                          ? `${data?.minimum_salary} LPA`
                          : "NA"}
                      </span>
                    </div>
                  </li>
                </ul>
                <a
                  onClick={(e) => handleApply(e, data)}
                  class="btn btn-primary d-block mt-5"
                >
                  Apply now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {Array.isArray(related_jobs) && related_jobs.length > 0 && (
        <section class="related-job-list ptb-60 bg-light-subtle">
          <div class="container">
            <div class="row align-items-center justify-content-between">
              <div class="col-lg-12 col-md-12">
                <div class="section-heading mb-3">
                  <h4 class="h5 text-primary">Related Jobs</h4>
                </div>
              </div>
            </div>
            <div class="row">
              {Array.isArray(related_jobs) &&
                related_jobs.map((item, idx) => (
                  <div class="col-lg-4 col-md-6">
                    <Link
                      to={`/job/${item?.job_slug}`}
                      class="text-decoration-none mt-4 mt-lg-0 mt-xl-0 single-open-job p-5 bg-white d-block rounded-custom"
                    >
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="text-muted h6 mb-2 job-time text-capitalize">
                          {" "}
                          {item?.type.replace(/-/g, " ")}
                        </span>
                        <span class="badge rounded-pill px-3 py-2 bg-primary-soft text-primary small">
                          {item?.department?.Department_name}
                        </span>
                      </div>
                      <h3 class="h5 text-capitalize">{item?.title}</h3>
                      <ul class="job-info-list list-inline list-unstyled text-muted">
                        <li class="list-inline-item">
                          <span class="fas fa-house me-1"></span>{" "}
                          {item?.company?.company_name}
                        </li>
                        <li class="list-inline-item">
                          <span class="fas fa-location-arrow me-1"></span>{" "}
                          {item?.location?.location_name}
                        </li>
                        <li class="list-inline-item">
                          <span class="fas fa-wallet me-1"></span>{" "}
                          {item?.minimum_salary && item?.maximum_salary
                            ? `${item?.minimum_salary} - ${item?.maximum_salary} LPA`
                            : !item?.minimum_salary && item?.maximum_salary
                            ? `${item?.maximum_salary} LPA`
                            : item?.minimum_salary && !item?.maximum_salary
                            ? `${item?.minimum_salary} LPA`
                            : "NA"}
                        </li>
                      </ul>
                      <button
                        onClick={(e) => handleApply(e, item)}
                        class="btn btn-primary btn-sm d-inline-block mt-4"
                      >
                        Apply Now
                      </button>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Career;
